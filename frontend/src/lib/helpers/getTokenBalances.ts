import { erc20Abi, formatEther, parseEther, type PublicClient } from "viem";
import { supportedchains } from "../constants";
import { chilizSpicy } from "../config";

export default async function getTokenBalances(
  publicClient: PublicClient,
  address: string,
  token1: string,
  token2: string
): Promise<{ amount1: string; amount2: string }> {
  const balances = {
    amount1: "0",
    amount2: "0",
  };
  balances.amount1 = formatEther(
    await publicClient.readContract({
      address: supportedchains[chilizSpicy.id].tokens[token1] as `0x${string}`,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [address as `0x${string}`],
    })
  ).toString();
  balances.amount2 = formatEther(
    await publicClient.readContract({
      address: supportedchains[chilizSpicy.id].tokens[token2] as `0x${string}`,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [address as `0x${string}`],
    })
  ).toString();

  return balances;
}
