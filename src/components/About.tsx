import Image from 'next/image';
import { profile } from '@/data/profile';

export default function About() {
  return (
    <section
      id="about"
      className="section border-y border-border/50 bg-surface-muted/30"
    >
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          
          {/* Left Column: Title & Photo */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="section-eyebrow">01. About Me</h2>
            <h3 className="section-title mb-8">Background & Specialization</h3>
            
            {/* Profile Photo Wrapper */}
            <div className="relative aspect-square max-w-sm overflow-hidden rounded-2xl bg-surface-muted border border-border/50 shadow-sm">
              {/* Replace the src below with your actual image path (e.g., /me.jpg) */}
              <div className="absolute inset-0 flex items-center justify-center text-muted font-mono text-sm">
                [Profile Photo Placeholder]
              </div>
              {/* <Image 
                src="/profile-photo.jpg" 
                alt="Nathan Michira Gesora" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              /> */}
            </div>
          </div>

          {/* Right Column: Text & Metrics */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Biography Text */}
            <div className="space-y-6 text-lg leading-relaxed text-muted">
              <p>
                I&apos;m an IT Administrator and Full-Stack Software Developer
                focused on building practical digital systems for real-world
                business needs. My work spans enterprise application
                development, databases, REST APIs, system integration, and
                software deployment.
              </p>
              <p>
                I work primarily with Java and Spring Boot on the backend,
                alongside React and Next.js for modern web applications. I
                place strong emphasis on clean architecture, reliable data
                models, maintainable code, and software that can evolve as
                business requirements change.
              </p>
              <p>
                My experience also extends to IT infrastructure and system
                administration. I work with Windows and Linux environments,
                Docker, databases, networking, deployment infrastructure, and
                technical support, allowing me to take software from
                development through deployment and ongoing operation.
              </p>
              <p className="font-medium text-foreground">
                {profile.location} · Open to software development,
                infrastructure, and technology opportunities.
              </p>
            </div>

            {/* Metrics Dashboard Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
                <div className="text-3xl font-bold text-foreground">3+</div>
                <div className="mt-1 text-xs font-medium text-muted uppercase tracking-wider">Years Exp.</div>
              </div>
              <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
                <div className="text-3xl font-bold text-foreground">15+</div>
                <div className="mt-1 text-xs font-medium text-muted uppercase tracking-wider">Projects</div>
              </div>
              <div className="rounded-xl border border-border bg-background p-4 shadow-sm col-span-2">
                <div className="text-lg font-bold text-foreground leading-tight">Java, Node.js,<br/>React, Linux</div>
                <div className="mt-2 text-xs font-medium text-primary uppercase tracking-wider">Core Stack</div>
              </div>
              <div className="rounded-xl border border-border bg-background p-4 shadow-sm col-span-2 sm:col-span-4 flex flex-col justify-center">
                <div className="text-lg font-bold text-foreground leading-tight">Diploma in Information Communication Technology</div>
                <div className="mt-1 text-sm text-muted">Nairobi Technical Training Institute</div>
                <div className="mt-2 text-xs font-medium text-primary uppercase tracking-wider">Education</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}