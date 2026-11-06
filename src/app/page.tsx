import { About } from "@/components/About";
import { Capabilities } from "@/components/Capabilities";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { CampaignArax, CampaignOrbox, WorkBridge } from "@/components/Work";
import { ContinuousStage } from "@/components/motion/ContinuousStage";

export default function HomePage() {
  return (
    <ContinuousStage>
      <Hero />
      <WorkBridge />
      <CampaignArax />
      <CampaignOrbox />
      <About />
      <Capabilities />
      <Contact />
    </ContinuousStage>
  );
}
