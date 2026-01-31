import React from "react";
import { motion } from "framer-motion";
import { Code2, Zap, Users, Lightbulb } from "lucide-react";

const highlights = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Clean Code Advocate",
    description:
      "Writing maintainable, scalable, and well-documented code is my passion.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Performance Expert",
    description:
      "Specialized in web performance optimization, achieving significant load time improvements.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Team Leader",
    description:
      "Experience leading frontend teams and mentoring junior developers.",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Problem Solver",
    description:
      "Diagnosed and resolved complex technical issues that blocked teams for months.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-muted/30">
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
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-muted-foreground mb-6">
              I'm a{" "}
              <span className="text-foreground font-medium">
                Senior Frontend Engineer
              </span>{" "}
              with over 6 years of experience building modern web applications.
              My journey in software development started at Hanoi University of
              Science and Technology, where I studied Mathematics and
              Informatics.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              I'm passionate about{" "}
              <span className="text-foreground font-medium">JavaScript</span>{" "}
              and have deep expertise in the{" "}
              <span className="text-foreground font-medium">
                React ecosystem
              </span>
              . I specialize in building large-scale micro-frontend applications
              using technologies like{" "}
              <span className="text-foreground font-medium">single-spa</span>{" "}
              and
              <span className="text-foreground font-medium">
                {" "}
                Module Federation
              </span>
              .
            </p>
            <p className="text-lg text-muted-foreground">
              Currently, I'm the sole Front-end Engineer for Deputy Analytics,
              where I've helped drive{" "}
              <span className="text-foreground font-medium">
                $1M+ USD in revenue
              </span>{" "}
              through high-impact feature delivery and performance
              optimizations.
            </p>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
