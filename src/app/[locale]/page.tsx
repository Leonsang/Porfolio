'use client';
import { PortfolioLayout } from '@/components/layout/PortfolioLayout';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { TechnicalSection } from '@/components/sections/TechnicalSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <PortfolioLayout>
      {/* Main Content Sections */}
      <main className="relative z-content">
        <HeroSection />
        <AboutSection />
        <TechnicalSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
    </PortfolioLayout>
  );
}
