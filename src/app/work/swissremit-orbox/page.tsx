import type { Metadata } from "next";
import { CaseStudy } from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "SwissRemit / Orbox",
  description:
    "SwissRemit / Orbox — applied AI solutions and workflow automation with explicit system boundaries.",
};

export default function SwissRemitOrboxPage() {
  return <CaseStudy which="caseSwiss" />;
}
