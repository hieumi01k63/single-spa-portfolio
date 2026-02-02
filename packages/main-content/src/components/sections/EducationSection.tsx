import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, BookOpen } from "lucide-react";
import {
  AnimatedCard,
  SkillBadge,
  SkillBadgeContainer,
} from "@portfolio/shared";

const foundationAreas = [
  "Data Structures",
  "Algorithms",
  "Mathematics",
  "Computer Science",
  "Software Engineering",
  "Web Development",
];

export function EducationSection() {
  return (
    <section id="education" className="py-24 px-6">
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
            Education
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Education Card */}
        <AnimatedCard className="relative p-8 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative flex flex-col md:flex-row gap-6">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <GraduationCap className="w-8 h-8" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                Mathematics and Informatics
              </h3>
              <p className="text-lg text-primary font-medium mb-4">
                Hanoi University of Science and Technology
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Hanoi, Vietnam
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  01/2018 - 2021
                </span>
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    I left university after my third year due to family
                    circumstances; however, I have the CS foundation and
                    hands-on experience required to succeed in software
                    development. My strong mathematical background and
                    self-directed learning have been instrumental in my career
                    growth.
                  </p>
                </div>
              </div>

              {/* Key Learnings */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-foreground mb-3">
                  Foundation Areas
                </h4>
                <SkillBadgeContainer>
                  {foundationAreas.map((item) => (
                    <SkillBadge key={item} skill={item} />
                  ))}
                </SkillBadgeContainer>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </section>
  );
}
