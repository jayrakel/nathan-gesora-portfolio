import Link from 'next/link';

import { profile } from '@/data/profile';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
    >
      {/* Subtle background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"
      />

      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Column: Text & Intro */}
          <div className="max-w-2xl min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-4 py-1.5 mb-6">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs font-medium tracking-wide text-foreground">
                IT Administrator • Full-Stack Software Developer
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-5xl xl:text-6xl">
              {profile.name}.
              <span className="block mt-2 text-muted text-3xl sm:text-4xl lg:text-3xl xl:text-4xl">
                {profile.title}.
              </span>
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-muted sm:text-xl">
              {profile.statement}
            </p>

            <div className="mb-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#projects"
                className="btn btn-primary h-12 px-8 text-base"
              >
                View Projects
              </Link>

              <a
                href={profile.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline h-12 px-8 text-base"
              >
                Download CV
              </a>
            </div>

            <div className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:gap-4">
              <span>{profile.location}</span>

              <span
                aria-hidden="true"
                className="hidden text-border sm:inline"
              >
                /
              </span>

              <Link
                href="#contact"
                className="font-medium text-primary hover:text-foreground"
              >
                Available for opportunities
              </Link>
            </div>
          </div>

          {/* Right Column: Full-Stack Visual */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none min-w-0 mt-8 lg:mt-0">
            
            {/* Decorative background blur */}
            <div className="absolute -inset-4 z-0 rounded-3xl bg-primary/10 blur-2xl filter" />

            {/* Backend Code Window */}
            <div className="relative z-10 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
              {/* Editor Header */}
              <div className="flex items-center border-b border-white/10 bg-white/5 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="ml-4 font-mono text-[10px] font-medium tracking-wider text-gray-400">
                  SystemMonitorController.java
                </div>
              </div>
              
              {/* Editor Content */}
              <div className="p-3 sm:p-6 text-xs sm:text-sm font-mono leading-relaxed text-gray-300 overflow-x-auto">
                <div className="flex">
                  <span className="w-8 shrink-0 select-none text-gray-600">1</span>
                  <span className="whitespace-nowrap"><span className="text-[#e5c07b]">@RestController</span></span>
                </div>
                <div className="flex">
                  <span className="w-8 shrink-0 select-none text-gray-600">2</span>
                  <span className="whitespace-nowrap"><span className="text-[#c678dd]">public class</span> <span className="text-[#e5c07b]">SystemMonitorController</span> {'{'}</span>
                </div>
                <div className="flex">
                  <span className="w-8 shrink-0 select-none text-gray-600">3</span>
                  <span className="whitespace-nowrap"><span className="text-[#c678dd]"></span></span>
                </div>
                <div className="flex">
                  <span className="w-8 shrink-0 select-none text-gray-600">4</span>
                  <span className="ml-4 whitespace-nowrap"><span className="text-[#e5c07b]">@GetMapping</span>(<span className="text-[#98c379]">"/api/status"</span>)</span>
                </div>
                <div className="flex">
                  <span className="w-8 shrink-0 select-none text-gray-600">5</span>
                  <span className="ml-4 whitespace-nowrap"><span className="text-[#c678dd]">public</span> <span className="text-[#e5c07b]">ResponseEntity</span>&lt;<span className="text-[#e5c07b]">SystemMetrics</span>&gt; <span className="text-[#61afef]">getStatus</span>() {'{'}</span>
                </div>
                <div className="flex">
                  <span className="w-8 shrink-0 select-none text-gray-600">6</span>
                  <span className="ml-8 whitespace-nowrap"><span className="text-[#e5c07b]">SystemMetrics</span> metrics = service.<span className="text-[#61afef]">getClusterHealth</span>();</span>
                </div>
                <div className="flex">
                  <span className="w-8 shrink-0 select-none text-gray-600">7</span>
                  <span className="ml-8 whitespace-nowrap"><span className="text-[#c678dd]">if</span> (metrics.<span className="text-[#61afef]">hasNodeFailure</span>()) {'{'}</span>
                </div>
                <div className="flex">
                  <span className="w-8 shrink-0 select-none text-gray-600">8</span>
                  <span className="ml-12 whitespace-nowrap">log.<span className="text-[#61afef]">error</span>(<span className="text-[#98c379]">"Node failure detected in cluster"</span>);</span>
                </div>
                <div className="flex">
                  <span className="w-8 shrink-0 select-none text-gray-600">9</span>
                  <span className="ml-8 whitespace-nowrap">{'}'}</span>
                </div>
                <div className="flex">
                  <span className="w-8 shrink-0 select-none text-gray-600">10</span>
                  <span className="ml-8 whitespace-nowrap"><span className="text-[#c678dd]">return</span> <span className="text-[#e5c07b]">ResponseEntity</span>.<span className="text-[#61afef]">ok</span>(metrics);</span>
                </div>
                <div className="flex">
                  <span className="w-8 shrink-0 select-none text-gray-600">11</span>
                  <span className="ml-4 whitespace-nowrap">{'}'}</span>
                </div>
                <div className="flex mt-3">
                  <span className="w-8 shrink-0 select-none text-gray-600">12</span>
                  <span className="text-gray-500 italic whitespace-nowrap">// Serving 10k req/sec with Spring Boot</span>
                </div>
              </div>
            </div>

            {/* Floating Frontend UI Component */}
            <div className="absolute -bottom-8 -left-8 z-20 hidden rounded-xl border border-border bg-background p-5 shadow-2xl sm:block sm:w-72 transition-transform duration-500 hover:-translate-y-2">
              <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
                <div className="font-bold text-foreground text-sm tracking-wide uppercase">System Status</div>
                <div className="flex h-6 items-center rounded-full bg-emerald-500/10 px-2.5 text-[10px] font-bold text-emerald-600 tracking-wider">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  LIVE
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted">Global Uptime</span>
                  <span className="text-xs font-mono font-bold text-foreground">99.998%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted">API Latency</span>
                  <span className="text-xs font-mono font-bold text-emerald-600">14ms</span>
                </div>
                <div>
                  <div className="mb-1.5 flex justify-between text-[10px] font-medium text-muted">
                    <span>Cluster CPU Load</span>
                    <span>42%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                    <div className="h-full w-[42%] rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}