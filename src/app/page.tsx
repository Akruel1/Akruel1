import { About } from "@/components/About";
import { Capabilities } from "@/components/Capabilities";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Capabilities />
      <Contact />
    </>
  );
}
