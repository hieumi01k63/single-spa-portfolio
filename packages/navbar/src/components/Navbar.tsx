import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  FolderKanban,
  Code2,
  Award,
  GraduationCap,
  Mail,
  Moon,
  Sun,
  Github,
  Linkedin,
} from "lucide-react";
import { usePortfolioStore, type SectionId } from "@portfolio/shared";

const navItems: { id: SectionId; label: string; icon: React.ReactNode }[] = [
  { id: "hero", label: "Home", icon: <Home className="w-5 h-5" /> },
  { id: "about", label: "About", icon: <User className="w-5 h-5" /> },
  {
    id: "experience",
    label: "Experience",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderKanban className="w-5 h-5" />,
  },
  { id: "skills", label: "Skills", icon: <Code2 className="w-5 h-5" /> },
  { id: "awards", label: "Awards", icon: <Award className="w-5 h-5" /> },
  // { id: "education", label: "Education", icon: <GraduationCap className="w-5 h-5" /> },
  { id: "contact", label: "Contact", icon: <Mail className="w-5 h-5" /> },
];

export function Navbar() {
  const { activeSectionId, setActiveSection, isDarkMode, toggleDarkMode } =
    usePortfolioStore();

  const handleNavClick = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="h-full bg-background/80 backdrop-blur-lg border-r border-border flex flex-col"
    >
      {/* Logo / Name */}
      <div className="p-6 border-b border-border">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-foreground">Teo</h1>
          <p className="text-sm text-muted-foreground">
            Senior Frontend Engineer
          </p>
        </motion.div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {navItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <button
                onClick={() => handleNavClick(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  text-sm font-medium transition-all duration-200
                  ${activeSectionId === item.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
                {activeSectionId === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground"
                  />
                )}
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          {/* Social Links */}
          <div className="flex gap-2">
            <motion.a
              href="https://github.com/hieumi01k63"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/hieu-nguyen-711460273"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
