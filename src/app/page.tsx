import { About } from "@/components/About";
import { Capabilities } from "@/components/Capabilities";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { Process } from "@/components/Process";
import { SelectedWork } from "@/components/SelectedWork";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <SelectedWork />
      <Capabilities />
      <Process />
      <About />
      <Contact />
    </>
  );
}
