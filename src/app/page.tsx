import Hero from "@/components/home/hero";
import RiskShowcase from "@/components/home/riskShowcase";
import SkillsMarquee from "@/components/home/skillsMarquee";
import AboutMe from "@/components/aboutMe";
import Footer from "@/components/footer";
import Contact from "@/components/contact";
import Projects from "@/components/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <RiskShowcase />
      <SkillsMarquee />
      <AboutMe />
      <div id="projects"><Projects /></div>
      <div id="contact"><Contact /></div>
      <Footer />
    </>
  );
}
