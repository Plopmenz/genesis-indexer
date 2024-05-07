import { Address, Hex } from "viem";

export interface Mint {
  transactionHash: Hex;
  account: Address;
  paid: bigint;
}
