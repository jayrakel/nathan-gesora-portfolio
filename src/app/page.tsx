import About from '@/components/About';
import ContactForm from '@/components/ContactForm';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Nav from '@/components/Nav';
import ProjectGrid from '@/components/ProjectGrid';
import Services from '@/components/Services';
import Skills from '@/components/Skills';

export default function HomePage() {
  return (
    <>
      <Nav />

      <main>
        <Hero />
        <About />
        <Skills />
        <ProjectGrid />
        <Experience />
        <Education />
        <Services />
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}