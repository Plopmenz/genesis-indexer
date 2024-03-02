import { Storage } from "..";
import { ContractWatcher } from "../utils/contract-watcher";
import { Contribution } from "../types/contribution";
import { OpenmeshGenesisContract } from "../contracts/OpenmeshGenesis";

export function watchContribtionMade(contractWatcher: ContractWatcher, storage: Storage) {
  contractWatcher.startWatching("ContribtionMade", {
    abi: OpenmeshGenesisContract.abi,
    address: OpenmeshGenesisContract.address,
    eventName: "ContributionMade",
    strict: true,
    onLogs: async (logs) => {
      await Promise.all(
        logs.map(async (log) => {
          const { args, transactionHash } = log;

          const event = {
            transactionHash,
            ...args,
          } as Contribution;

          await processContribtionMade(event, storage);
        })
      );
    },
  });
}

export async function processContribtionMade(event: Contribution, storage: Storage): Promise<void> {
  await storage.contributions.update((contributions) => {
    contributions.push(event);
  });
}
