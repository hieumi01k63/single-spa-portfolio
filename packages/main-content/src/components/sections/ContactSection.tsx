import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";
import {
  AnimatedCard,
  staggerContainerVariants,
  Input,
  Textarea,
  Label,
  Button,
} from "@portfolio/shared";

const contactInfo = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "nguyentrunghieu6934@gmail.com",
    href: "mailto:nguyentrunghieu6934@gmail.com",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Phone (WhatsApp, Telegram, Zalo)",
    value: "+84 866 540 700",
    href: "tel:+84866540700",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: "LinkedIn",
    value: "hieu-nguyen-711460273",
    href: "https://linkedin.com/in/hieu-nguyen-711460273",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Location",
    value: "Hanoi, Vietnam",
    href: null,
  },
];

// Contact card variant with slide from left
const contactCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
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
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in hearing about new opportunities,
            challenging projects, or just connecting with fellow developers.
            Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {contactInfo.map((item) => (
              <AnimatedCard
                key={item.label}
                variants={contactCardVariants}
                className="p-4"
                hoverBorder={!!item.href}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-foreground font-medium">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-foreground font-medium">
                        {item.value}
                      </p>
                    </div>
                  </div>
                )}
              </AnimatedCard>
            ))}
          </motion.div>

          {/* Contact Form */}
          <AnimatedCard className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Send a Message
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="your@email.com" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={4} placeholder="Your message..." />
              </div>
              <Button
                type="submit"
                size="lg"
                fullWidth
                animated
                leftIcon={<Send className="w-4 h-4" />}
              >
                Send Message
              </Button>
            </form>
            <p className="mt-4 text-xs text-center text-muted-foreground">
              Note: This is a demo form. For actual contact, please use the
              email or phone above.
            </p>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}
