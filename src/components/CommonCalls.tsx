import { PublicKey } from "@solana/web3.js";
export function getShortKey(long_key: string) {
  const str: string = long_key.slice(0, 12) + "..." + long_key.slice(-10);
  console.log("long key=", long_key);
  return str;
}
export const validateSolanaAddress = async (addr: string) => {
  let publicKey: PublicKey;
  try {
    publicKey = new PublicKey(addr);
    return await PublicKey.isOnCurve(publicKey.toBytes());
  } catch (err) {
    return false;
  }
};
