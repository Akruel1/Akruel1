import type { Metadata } from "next";
import { OrboxCase } from "@/components/OrboxCase";

export const metadata: Metadata = {
  title: "Orbox",
  description:
    "Orbox — applied AI solutions and workflow automation with explicit system boundaries.",
};

export default function OrboxPage() {
  return <OrboxCase />;
}
