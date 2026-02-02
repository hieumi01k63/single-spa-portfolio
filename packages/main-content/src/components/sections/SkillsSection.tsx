import React from "react";
import { motion } from "framer-motion";
import {
  AnimatedCard,
  AnimatedCardHeader,
  SkillBadge,
  SkillBadgeContainer,
  staggerContainerVariants,
} from "@portfolio/shared";

interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend Frameworks",
    icon: "⚛️",
    skills: ["React", "Next.js", "Remix", "Vue 3", "Astro", "React Native"],
  },
  {
    name: "State Management",
    icon: "🔄",
    skills: ["Zustand", "Redux", "TanStack Query", "Jotai", "Pinia"],
  },
  {
    name: "Styling & UI",
    icon: "🎨",
    skills: [
      "Tailwind CSS",
      "Shadcn-ui",
      "Framer Motion",
      "Styled Components",
      "Linaria",
      "SASS/SCSS",
    ],
  },
  {
    name: "Build & Architecture",
    icon: "🏗️",
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
    icon: "🧪",
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
    icon: "🛠️",
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
    icon: "💻",
    skills: ["TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    name: "Other Skills",
    icon: "📋",
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
          {skillCategories.map((category) => (
            <AnimatedCard key={category.name}>
              <AnimatedCardHeader icon={category.icon} title={category.name} />
              <SkillBadgeContainer>
                {category.skills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </SkillBadgeContainer>
            </AnimatedCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
