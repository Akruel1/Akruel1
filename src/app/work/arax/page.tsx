import type { Metadata } from "next";
import { CaseStudy } from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "ARAX",
  description:
    "ARAX — enterprise AI knowledge platform concept under Taorlox: architecture for ingestion, embeddings, vector retrieval, and controlled answer surfaces.",
};

export default function AraxPage() {
  return <CaseStudy which="caseArax" />;
}
