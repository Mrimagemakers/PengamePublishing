import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Our Office",
    lines: ["650 Ponce De Leon Ave", "Ste. 300 #1548", "Atlanta, GA 30308"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["(770) 585-4678", "(412) 961-2312"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@pengamepublishing.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Monday - Friday", "9:00 AM - 6:00 PM EST"],
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website Contact: ${formData.subject}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:info@pengamepublishing.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {/* Header */}
      <section className="bg-primary py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm uppercase tracking-[0.2em] text-secondary font-body font-semibold mb-3">
              Get in Touch
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Contact Us
            </h1>
            <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto">
              Reach out for a revolutionary reading experience that will inspire, educate, and entertain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {CONTACT_INFO.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-card rounded-2xl border border-border/50 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{info.title}</h3>
                {info.lines.map((line, j) => (
                  <p key={j} className="font-body text-sm text-muted-foreground">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Contact form */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Send Us a Message
              </h2>
              <p className="font-body text-muted-foreground mb-8">
                Have a question about our books, services, or partnership opportunities? We'd love to hear from you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label className="font-body text-sm font-medium mb-2 block">Name *</Label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="font-body"
                    />
                  </div>
                  <div>
                    <Label className="font-body text-sm font-medium mb-2 block">Email *</Label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="font-body"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-body text-sm font-medium mb-2 block">Subject *</Label>
                  <Input
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="How can we help?"
                    className="font-body"
                  />
                </div>
                <div>
                  <Label className="font-body text-sm font-medium mb-2 block">Message *</Label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className="font-body"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary hover:bg-primary/90 font-body font-semibold px-8 h-12"
                >
                  Open Email to Send
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </motion.div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg border border-border/50"
            >
              <iframe
                src="https://maps.google.com/maps?q=650+Ponce+De+Leon+Ave+Atlanta+GA&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="PenGame Publishing Location"
                className="w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
