import React from "react";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

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
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.name}
              variants={cardVariants}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl" role="img" aria-label={category.name}>
                  {category.icon}
                </span>
                <h3 className="text-sm font-semibold text-foreground">
                  {category.name}
                </h3>
              </div>
              <motion.div
                variants={containerVariants}
                className="flex flex-wrap gap-2"
              >
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={skillVariants}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
