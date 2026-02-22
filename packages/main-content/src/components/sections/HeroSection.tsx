import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Mail, Phone } from "lucide-react";
import { Button, ParticleField } from "@portfolio/shared";

export function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Interactive particle background */}
      <ParticleField
        count={200}
        globeSize={1.2}
        particleScale={1.3}
        ringRadius={0.05}
        ringWidth={0.3}
        displacement={0.05}
        heartbeatScale={5}
        swimSpeed={0.8}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg text-muted-foreground mb-4"
        >
          Hello, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-foreground mb-4"
        >
          Hieu Nguyen
          <span className="text-primary"> (Teo)</span>
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl font-medium text-muted-foreground mb-6"
        >
          Senior Front-End Engineer
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          6+ years of experience building performant web applications.
          Passionate about JavaScript and specialized in React ecosystem with
          hands-on experience in large-scale micro-frontend architectures.
        </motion.p>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-12"
        >
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Hanoi, Vietnam
          </span>
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            nguyentrunghieu6934@gmail.com
          </span>
          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            +84 866 540 700
          </span>
        </motion.div>

        {/* CTA Button */}
        <Button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          onClick={scrollToAbout}
          size="lg"
          rounded="full"
          rightIcon={
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.span>
          }
        >
          Learn more about me
        </Button>
      </div>
    </section>
  );
}
