/**
 * Crypto donation wallets — single source of truth.
 * Addresses must match character-for-character across UI, QR payloads, and docs.
 */
export type DonationMethodId = "usdt" | "ltc" | "btc" | "eth";

export type DonationMethod = {
  id: DonationMethodId;
  /** Display ticker / short name */
  ticker: string;
  /** Full asset name */
  asset: string;
  /** Exact wallet address encoded in QR + copy */
  address: string;
  /** Network label shown prominently to prevent wrong-network transfers */
  network: string;
  /** Accent environment for the card block */
  env: "ivory" | "black" | "cobalt" | "silver";
};

export const DONATION_METHODS: readonly DonationMethod[] = [
  {
    id: "usdt",
    ticker: "USDT",
    asset: "Tether",
    address: "TFDgn37KdCdLNodVsznUrivpxNS24SBb7t",
    network: "TRC20 / Tron",
    env: "cobalt",
  },
  {
    id: "ltc",
    ticker: "LTC",
    asset: "Litecoin",
    address: "ltc1qh5h8xv7dy2z4mny2g5amyjnw0qddypgfxsjs6j",
    network: "Litecoin",
    env: "ivory",
  },
  {
    id: "btc",
    ticker: "BTC",
    asset: "Bitcoin",
    address: "bc1qmjlgq983f3c6q08gs7lgap2sl6vl544vyty9aa",
    network: "Bitcoin",
    env: "black",
  },
  {
    id: "eth",
    ticker: "ETH",
    asset: "Ethereum",
    address: "0xbe417ec282Cda431D3c76DC8B75673c5BC6a0d49",
    network: "Ethereum Mainnet",
    env: "silver",
  },
] as const;
