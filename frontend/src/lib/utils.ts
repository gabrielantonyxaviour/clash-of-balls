import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { parseEther } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function roundUpToFiveDecimals(floatStr: string): string {
  const num = parseFloat(floatStr);

  if (isNaN(num)) {
    return "0.00";
  }

  const roundedNum = Math.ceil(num * 100000) / 100000;

  let result = roundedNum.toFixed(5);

  if (result.endsWith("000") || result.endsWith("00")) {
    result = parseFloat(result).toFixed(2);
  }

  return result;
}
export function timeAgo(timestamp: string | number | Date): string {
  const now = new Date();
  const timeDiff =
    now.getTime() - new Date(parseInt(timestamp + "000")).getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
}
