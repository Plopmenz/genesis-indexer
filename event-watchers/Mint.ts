import { Storage } from "..";
import { ContractWatcher } from "../utils/contract-watcher";
import { Mint } from "../types/mint";
import { OpenmeshGenesisContract } from "../contracts/OpenmeshGenesis";

export function watchMint(contractWatcher: ContractWatcher, storage: Storage) {
  contractWatcher.startWatching("Mint", {
    abi: OpenmeshGenesisContract.abi,
    address: OpenmeshGenesisContract.address,
    eventName: "Mint",
    strict: true,
    onLogs: async (logs) => {
      await Promise.all(
        logs.map(async (log) => {
          const { args, transactionHash } = log;

          const event = {
            transactionHash,
            ...args,
          } as Mint;

          await processMint(event, storage);
        })
      );
    },
  });
}

export async function processMint(event: Mint, storage: Storage): Promise<void> {
  await storage.mints.update((mints) => {
    mints.push(event);
  });
}
