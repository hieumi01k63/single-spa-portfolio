import React from "react";
import { motion } from "framer-motion";
import { Building2, Calendar, MapPin } from "lucide-react";

interface Experience {
  company: string;
  role: string;
  type: string;
  location: string;
  period: string;
  description: string[];
}

const experiences: Experience[] = [
  {
    company: "Deputy (CBTW)",
    role: "Senior Front-end Engineer (SE3)",
    type: "Full-time",
    location: "Hanoi (Hybrid)",
    period: "05/2025 - Present",
    description: [
      "Sole Front-end Engineer for Deputy Analytics, owning the entire module's front-end code, tests, and resources end-to-end.",
      "Primary point of contact between Engineering and Product/Design; lead front-end design/technical decisions.",
      "Helped drive $1M+ USD in 2025 revenue through high-impact feature delivery and iteration.",
    ],
  },
  {
    company: "ZIVA",
    role: "Senior Front-end Engineer/Consultant",
    type: "Part-time Contractor",
    location: "Remote",
    period: "03/2023 - 05/2025",
    description: [
      "Serve as Senior Frontend Consultant, owning end-to-end front-end codebase and related engineering resources.",
      "Contributed directly to product expansion into 3 new regions: Latin America, Middle East, and Canada.",
      "Honored to be recognized as Canadian Tire Retail's Playing Vendor of the Year (2024).",
    ],
  },
  {
    company: "FPT Software",
    role: "Lead Front-end Engineer (DEV04)",
    type: "Full-time",
    location: "Remote",
    period: "06/2024 - 05/2025",
    description: [
      "Led a team of 4 front-end engineers, owning end-to-end front-end codebase and engineering resources.",
      "Recognized as top contributor for Q3 2024 by stakeholders.",
      "Received 'Rookie of the Year 2024' award and 'The Best Team 2024' award at FPT America.",
    ],
  },
  {
    company: "VMO Holdings",
    role: "Senior Front-end Engineer",
    type: "Full-time",
    location: "Hanoi (Hybrid)",
    period: "01/2023 - 06/2024",
    description: [
      "Senior Frontend Engineer in a 20-person team, collaborating with international colleagues worldwide.",
      "Worked on Zuellig Pharma project with Next.js, GraphQL, and Azure DevOps.",
    ],
  },
  {
    company: "Adamo Software",
    role: "Frontend Co-leader",
    type: "Full-time",
    location: "Hanoi (Hybrid)",
    period: "01/2021 - 01/2023",
    description: [
      "Started as mid-level Frontend Engineer, delivered 4 projects, promoted to Frontend Co-Leader after 2 years.",
      "Recognized as best individual and most valuable contributor in Q1 2023.",
    ],
  },
  {
    company: "LalaSoft Joint Stock Company",
    role: "Junior Front-end Developer",
    type: "Full-time",
    location: "Hybrid",
    period: "01/2019 - 01/2021",
    description: [
      "Developed new features and maintained existing modules for company's tools and production website.",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative mb-12 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12 md:ml-auto" : "md:pl-12"
              }`}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute top-0 w-4 h-4 rounded-full bg-primary border-4 border-background ${
                  index % 2 === 0
                    ? "left-0 md:-left-2 transform md:-translate-x-1/2"
                    : "left-0 md:left-auto md:-right-2 transform md:translate-x-1/2"
                }`}
              />

              {/* Content Card */}
              <div className="ml-8 md:ml-0 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <Building2 className="w-4 h-4" />
                      {exp.company}
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary min-w-fit">
                    {exp.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </span>
                </div>

                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
