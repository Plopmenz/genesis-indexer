import { config as loadEnv } from "dotenv";
import express from "express";
import storageManager from "node-persist";
import { sepolia } from "viem/chains";

import { registerRoutes } from "./api/simple-router";
import { PersistentJson } from "./utils/persistent-json";
import { watchContribtionMade } from "./event-watchers/ContributionMade";
import { Contribution } from "./types/contribution";
import { MultischainWatcher } from "./utils/multichain-watcher";

export type ContributionsStorage = Contribution[];
export interface Storage {
  contributions: PersistentJson<ContributionsStorage>;
}

async function start() {
  const loadEnvResult = loadEnv();
  if (loadEnvResult.error) {
    console.warn(`Error while loading .env: ${JSON.stringify(loadEnvResult.error)}`);
  }

  // Make contract watcher for each chain (using Infura provider)
  const multichainWatcher = new MultischainWatcher([
    {
      chain: sepolia,
      rpc: `sepolia.infura.io/ws/v3/${process.env.INFURA_API_KEY}`,
    },
  ]);

  // Data (memory + json files (synced) currently, could be migrated to a database solution if needed in the future)
  await storageManager.init({ dir: "storage" });
  const storage: Storage = {
    contributions: new PersistentJson<ContributionsStorage>("contributors", []),
  };

  multichainWatcher.forEach((contractWatcher) => {
    watchContribtionMade(contractWatcher, storage);
  });

  process.on("SIGINT", function () {
    console.log("Stopping...");

    multichainWatcher.forEach((contractWatcher) => {
      contractWatcher.stopAll();
    });
    process.exit();
  });

  // Webserver
  const app = express();
  registerRoutes(app, storage);

  var server = app.listen(process.env.PORT ?? 3001, () => {
    const addressInfo = server.address() as any;
    var host = addressInfo.address;
    var port = addressInfo.port;
    console.log(`Webserver started on ${host}:${port}`);
  });
}

start().catch(console.error);
