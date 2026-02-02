import React from "react";
import { motion } from "framer-motion";
import { Trophy, Calendar, Building2 } from "lucide-react";
import { AnimatedCard, staggerContainerVariants } from "@portfolio/shared";

interface Award {
  title: string;
  organization: string;
  date: string;
  description: string;
}

const awards: Award[] = [
  {
    title: "The 2024 Rookie Award",
    organization: "FPT Software",
    date: "December 2024",
    description:
      "In appreciation of exceptional performance and dedication as a newcomer.",
  },
  {
    title: "The Best Team 2024",
    organization: "FPT Software - FPT America",
    date: "December 2024",
    description:
      "Recognition for outstanding team collaboration and project delivery.",
  },
  {
    title: "Canadian Tire Retail's Playing Vendor of the Year",
    organization: "ZIVA",
    date: "November 2024",
    description:
      "Honored with the ZIVA team for exceptional partnership and performance.",
  },
  {
    title: "The Super Star Award",
    organization: "Adamo Software",
    date: "January 2023",
    description:
      "Best individual and most valuable contributor in the first quarter of 2023.",
  },
];

// Custom variants for award cards with scale effect
const awardCardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export function AwardsSection() {
  return (
    <section id="awards" className="py-24 px-6 bg-muted/30">
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
            Awards & Recognition
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Awards Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {awards.map((award) => (
            <AnimatedCard
              key={award.title}
              variants={awardCardVariants}
              whileHover={{ y: -5 }}
              className="relative p-6 overflow-hidden"
            >
              {/* Trophy Icon Background */}
              <div className="absolute top-4 right-4 text-primary/10">
                <Trophy className="w-16 h-16" />
              </div>

              {/* Content */}
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {award.title}
                </h3>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {award.organization}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {award.date}
                  </span>
                </div>

                <p className="text-muted-foreground">{award.description}</p>
              </div>
            </AnimatedCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
