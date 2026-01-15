import HeroSection from '@/components/about/HeroSection';
import CompanyStory from '@/components/about/CompanyStory';
import Timeline from '@/components/about/Timeline';
import Statistics from '@/components/about/Statistic';
import Team from '@/components/about/Team';
import MissionVision from '@/components/about/MissionVision';
export default function AboutPage() {
  return (
    <>
      <section data-header-theme="dark" >
      <HeroSection />
      <CompanyStory />
      <Team />
      <MissionVision />
      </section>
    </>
  );
}
