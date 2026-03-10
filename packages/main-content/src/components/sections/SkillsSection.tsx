import React from "react";
import { motion } from "framer-motion";
import {
  Atom,
  RefreshCw,
  Palette,
  Building2,
  FlaskConical,
  Wrench,
  Code,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatedCard,
  AnimatedCardHeader,
  SkillBadge,
  SkillBadgeContainer,
  staggerContainerVariants,
} from "@portfolio/shared";

interface SkillCategory {
  name: string;
  icon: LucideIcon;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend Frameworks",
    icon: Atom,
    skills: ["React", "Next.js", "Remix", "Vue 3", "Astro", "React Native"],
  },
  {
    name: "State Management",
    icon: RefreshCw,
    skills: ["Zustand", "Redux", "TanStack Query", "Jotai", "Pinia"],
  },
  {
    name: "Styling & UI",
    icon: Palette,
    skills: [
      "Tailwind CSS",
      "Shadcn-ui",
      "Framer Motion",
      "SASS/SCSS",
      "Linaria",
      "Three.js",
      "Rive Animation",
    ],
  },
  {
    name: "Build & Architecture",
    icon: Building2,
    skills: [
      "Webpack",
      "Vite",
      "Micro-frontend",
      "single-spa",
      "Module Federation",
    ],
  },
  {
    name: "Testing",
    icon: FlaskConical,
    skills: [
      "Jest",
      "Vitest",
      "Playwright",
      "Cypress",
      "React Testing Library",
    ],
  },
  {
    name: "DevOps & Tools",
    icon: Wrench,
    skills: [
      "Git",
      "Docker",
      "Azure DevOps",
      "Datadog",
      "LaunchDarkly",
      "CI/CD",
    ],
  },
  {
    name: "Core Languages",
    icon: Code,
    skills: ["TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    name: "Other Skills",
    icon: ClipboardList,
    skills: [
      "Agile/Scrum",
      "Code Review",
      "Mentorship",
      "TDD",
      "Design Systems",
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6">
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
            Technical Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            My comprehensive toolkit built over years of frontend engineering
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
            <AnimatedCard key={category.name}>
              <AnimatedCardHeader icon={<Icon size={18} />} title={category.name} />
              <SkillBadgeContainer>
                {category.skills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </SkillBadgeContainer>
            </AnimatedCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
