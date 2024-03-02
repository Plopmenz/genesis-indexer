import { Address, Hex } from "viem";

export interface Contribution {
  transactionHash: Hex;
  from: Address;
  amount: bigint;
  givenTokens: bigint;
  givenNFT: boolean;
}
