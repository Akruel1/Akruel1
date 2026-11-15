import type { Metadata } from "next";
import { DonatePage } from "@/components/DonatePage";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Andrey Tessa — crypto donations via USDT (TRC20), Litecoin, Bitcoin, and Ethereum Mainnet.",
};

export default function DonateRoute() {
  return <DonatePage />;
}
