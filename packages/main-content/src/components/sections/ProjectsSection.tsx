import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Zap, TrendingUp, Clock, TestTube } from "lucide-react";

interface Project {
  name: string;
  company: string;
  period: string;
  description: string;
  techStack: string[];
  achievements: { icon: React.ReactNode; text: string }[];
  link?: string;
}

const projects: Project[] = [
  {
    name: "Deputy Analytics",
    company: "CBTW",
    period: "05/2025 - Present",
    description:
      "End-to-end platform for managing hourly teams and running a profitable, compliant business.",
    techStack: [
      "Vue 3",
      "Pinia",
      "single-spa",
      "Module Federation",
      "Jest",
      "Playwright",
      "Datadog",
      "LaunchDarkly",
    ],
    achievements: [
      {
        icon: <TrendingUp className="w-4 h-4" />,
        text: "Helped drive $1M+ USD in 2025 revenue",
      },
      {
        icon: <Zap className="w-4 h-4" />,
        text: "Migrated ~80% of frontend from PHP to Vue 3 in 6 months",
      },
      {
        icon: <Clock className="w-4 h-4" />,
        text: "Cut CI time by ~90% (30mins to ~4mins)",
      },
      {
        icon: <TestTube className="w-4 h-4" />,
        text: "Achieved 83% test coverage",
      },
    ],
    link: "https://www.deputy.com/features/analytics",
  },
  {
    name: "ZIVA E-commerce",
    company: "ZIVA",
    period: "03/2023 - 01/2026",
    description:
      "Global brand e-commerce platform with equipment for every level of athleticism.",
    techStack: [
      "Next.js",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Redis",
      "Stripe",
      "Meilisearch",
    ],
    achievements: [
      {
        icon: <Zap className="w-4 h-4" />,
        text: "~50ms response times on cache hits",
      },
      {
        icon: <TrendingUp className="w-4 h-4" />,
        text: "Reduced DB load by 90% daily with SSR caching",
      },
      {
        icon: <Clock className="w-4 h-4" />,
        text: "Built Redis-backed stale-while-revalidate cache layer",
      },
    ],
    link: "https://ziva.com/",
  },
  {
    name: "Face Reality Skincare",
    company: "FPT Software",
    period: "06/2024 - 05/2025",
    description:
      "Award-winning, clinically proven acne brand's e-commerce and B2B platform.",
    techStack: [
      "Shopify",
      "React",
      "Remix",
      "Zustand",
      "Polaris UI",
      "Tailwind CSS",
      "Linaria",
      "Azure DevOps",
    ],
    achievements: [
      {
        icon: <TrendingUp className="w-4 h-4" />,
        text: "Onboarded 1200+ partners in 6 months",
      },
      {
        icon: <Clock className="w-4 h-4" />,
        text: "Reduced rebuild time from 30min to <4min",
      },
      {
        icon: <Zap className="w-4 h-4" />,
        text: "Improved INP from 400-500ms to <70ms",
      },
    ],
    link: "https://facerealityskincare.com/",
  },
  {
    name: "Zuellig Pharma Platform",
    company: "VMO Holdings",
    period: "06/2023 - 06/2024",
    description:
      "Enterprise pharmaceutical distribution platform serving healthcare across Asia.",
    techStack: [
      "Next.js",
      "Mantine UI",
      "Tailwind CSS",
      "Redux Toolkit",
      "RTK Query",
      "GraphQL",
      "Cypress",
      "Jest",
    ],
    achievements: [
      {
        icon: <Zap className="w-4 h-4" />,
        text: "Cut network load time by 30% with GraphQL",
      },
      {
        icon: <TrendingUp className="w-4 h-4" />,
        text: "Reduced bug rate by 70% with TDD",
      },
      {
        icon: <TestTube className="w-4 h-4" />,
        text: "Implemented Cypress + Jest testing",
      },
    ],
    link: "https://www.zuelligpharma.com/",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {project.company} • {project.period}
                  </p>
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Achievements */}
              <ul className="space-y-2">
                {project.achievements.map((achievement, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-primary">{achievement.icon}</span>
                    {achievement.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
