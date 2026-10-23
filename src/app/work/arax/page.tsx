import type { Metadata } from "next";
import { AraxCase } from "@/components/AraxCase";

export const metadata: Metadata = {
  title: "ARAX",
  description:
    "ARAX — enterprise AI knowledge platform concept under Taorlox: ingestion, embeddings, vector retrieval, and controlled answer surfaces.",
};

export default function AraxPage() {
  return <AraxCase />;
}
