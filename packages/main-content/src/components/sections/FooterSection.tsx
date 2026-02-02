import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socialLinks = [
  {
    icon: <Github className="w-5 h-5" />,
    href: "https://github.com/hieumi01k63/single-spa-portfolio",
    label: "GitHub",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: "https://linkedin.com/in/hieu-nguyen-711460273",
    label: "LinkedIn",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    href: "mailto:nguyentrunghieu6934@gmail.com",
    label: "Email",
  },
];

const techStack = [
  { name: "single-spa", href: "https://single-spa.js.org" },
  { name: "React", href: "https://react.dev" },
  { name: "Tailwind CSS", href: "https://tailwindcss.com" },
  { name: "Framer Motion", href: "https://www.framer.com/motion" },
];

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            {techStack.map((tech, index) => (
              <React.Fragment key={tech.name}>
                <a
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {tech.name}
                </a>
                {index < techStack.length - 1 && <span>·</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" />{" "}
              by Teo (Hieu Nguyen)
            </p>
            <p className="mt-1">© {currentYear} All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
