import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Star, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BOOKS = [
  { title: "The 7 Keys to Building a Powerful Personal Brand", emoji: "🔑", img: "https://media.base44.com/images/public/69d10a467c2c4dce14cecdcb/91943ca26_file_0000000001b071f8896ceadcf9b232a4.png" },
  { title: "7 Ways to Develop Your Leadership Skills", emoji: "📈", img: "https://media.base44.com/images/public/69d10a467c2c4dce14cecdcb/8bd2a87ff_Screenshot_20260404_112732_ChatGPT.jpg" },
  { title: "7 Ways to Recession-Proof Your Business", emoji: "🏦", img: "https://media.base44.com/images/public/69d10a467c2c4dce14cecdcb/323f60be9_file_00000000479071fd96b063a1b2807a0d.png" },
  { title: "7 Key Skills for AI Entrepreneurs", emoji: "🤖", img: "https://media.base44.com/images/public/69d10a467c2c4dce14cecdcb/a05c320ae_file_00000000eecc71f5bb90414ef38b82de.png" },
  { title: "7 Time Management Tips for Success", emoji: "⏱️", img: "https://media.base44.com/images/public/69d10a467c2c4dce14cecdcb/9966dfccf_Screenshot_20260404_113513_ChatGPT.jpg" },
  { title: "7 Traits of a Truly Entrepreneur Mindset", emoji: "💡", img: "https://media.base44.com/images/public/69d10a467c2c4dce14cecdcb/e2c1e4a77_Screenshot_20260404_112658_ChatGPT.jpg" },
  { title: "7 Techniques to Success Cryptosystem Trading", emoji: "📊", img: "https://media.base44.com/images/public/69d10a467c2c4dce14cecdcb/daa648f6f_Screenshot_20260404_112603_ChatGPT.jpg" },
];

const TRACKS = [
  { emoji: "🌿", title: "Emerging Leaders Track", desc: "Students, young professionals & early-stage leaders" },
  { emoji: "⚡", title: "Entrepreneur Success Track", desc: "Founders, freelancers, creators & small business owners" },
  { emoji: "👑", title: "Executive Leadership Track", desc: "Managers, directors, team leads & org leaders" },
  { emoji: "🤖", title: "Future-Ready Innovator Track", desc: "Leaders focused on AI, digital business & innovation" },
];

const TESTIMONIALS = [
  { name: "Marcus T.", role: "E-commerce Founder, Atlanta", text: "The Entrepreneur Mindset module alone was worth the entire program. I stopped fearing failure and started using it as data. My revenue doubled in 90 days." },
  { name: "Keisha M.", role: "Marketing Consultant, Charlotte", text: "Darnell's approach to personal branding gave me a clear, systematic blueprint. I went from invisible to getting consistent inbound clients within 60 days." },
  { name: "Jerome W.", role: "Real Estate Investor, Miami", text: "The Recession-Proof module restructured how I think about my business financially. We're now diversified, lean, and genuinely built to survive any storm." },
];

const PHASES = [
  {
    label: "Phase 1 · Weeks 1–4", title: "Foundation", color: "#D4A017",
    weeks: [
      { n: 1, title: "Orientation + Leadership Identity", desc: "Welcome · Vision & values · Self-assessment" },
      { n: 2, title: "Entrepreneurial Mindset", desc: "Resilience · Risk · Discipline · Opportunity" },
      { n: 3, title: "Personal Brand Strategy", desc: "Identity · Audience · Trust · Digital presence" },
      { n: 4, title: "Leadership Communication", desc: "Confidence · Influence · Teams" },
    ]
  },
  {
    label: "Phase 2 · Weeks 5–8", title: "Growth", color: "#F5C842",
    weeks: [
      { n: 5, title: "Time Management Systems", desc: "Priority · Execution rhythms · Habits" },
      { n: 6, title: "Strategic Thinking", desc: "Planning · Decision-making · Outcomes" },
      { n: 7, title: "Recession-Proof Business", desc: "Adaptation · Revenue strategy · Protection" },
      { n: 8, title: "AI for Entrepreneurs", desc: "Tools · Workflow · Automation" },
    ]
  },
  {
    label: "Phase 3 · Weeks 9–12", title: "Sustainability", color: "#2ECC71",
    weeks: [
      { n: 9, title: "Financial Discipline", desc: "Sustainable growth · Risk · Data" },
      { n: 10, title: "Leadership in Action", desc: "Case studies · Scenarios · Accountability" },
      { n: 11, title: "Capstone Build Week", desc: "Brand plan · Portfolio · Business roadmap" },
      { n: 12, title: "Graduation + Certification", desc: "Presentations · Awards · Alumni community" },
    ]
  },
];

const PLANS = [
  {
    tier: "Starter", title: "Leadership Starter Pass", price: "$47–$97", note: "One-time digital access",
    features: ["Select module access", "Downloadable workbooks", "Community access"],
    excluded: ["Live coaching calls", "Certification"],
    cta: "Get Access", highlight: false,
  },
  {
    tier: "Core Program", title: "7-Week Accelerator", price: "$197–$497", note: "Per cohort enrollment",
    features: ["All 7 modules — full access", "Workbooks & action guides", "Weekly live sessions", "Community + accountability", "Certificate of completion"],
    excluded: [],
    cta: "Enroll Now", highlight: false,
  },
  {
    tier: "Premium · Certification", title: "12-Week Certification", price: "$997–$2.5k", note: "Full certification program",
    features: ["All 7 modules + capstone", "3 structured phases", "Bi-weekly group coaching", "2 monthly 1-on-1 sessions", "Official PG Certification"],
    excluded: [],
    cta: "Apply Now", highlight: true,
  },
  {
    tier: "Enterprise / VIP", title: "Corporate & VIP", price: "$2.5k+", note: "Group or VIP package",
    features: ["Custom team curriculum", "Schools, orgs & churches", "Keynote + training bundle", "VIP 1-on-1 coaching", "Quarterly leadership summit"],
    excluded: [],
    cta: "Request Info", highlight: false,
  },
];

const DIVISIONS = [
  { emoji: "🏛", title: "Leadership Academy for Entrepreneurs", desc: "The core flagship program for founders, freelancers, and business builders." },
  { emoji: "🌟", title: "Youth Leadership Lab", desc: "Empowering the next generation through age-appropriate leadership curriculum." },
  { emoji: "💼", title: "Executive Success Institute", desc: "Advanced training for managers, directors, and organizational leaders." },
  { emoji: "🤖", title: "AI Leadership & Innovation Hub", desc: "Future-ready training leveraging AI and automation for competitive advantage." },
  { emoji: "👑", title: "Women of Vision Leadership Circle", desc: "A dedicated space for women entrepreneurs and executives." },
  { emoji: "✝", title: "Faith, Purpose & Leadership Series", desc: "Values-driven leadership for faith-based organizations and communities." },
];

const ENROLL_URL = "mailto:Info@pengamepublishing.com?subject=PG Leadership Academy Enrollment";

export default function LeadershipAcademy() {
  const [openPhase, setOpenPhase] = useState(0);

  return (
    <div className="bg-[#050D1A] text-[#F8F5EE] font-body">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/69d10a467c2c4dce14cecdcb/fe92893e9_ChatGPTImageApr7202602_28_25PM.png"
            alt="PG Leadership Academy Banner"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050D1A]/70 via-transparent to-[#050D1A]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[#D4A017] text-xs uppercase tracking-[0.3em] font-semibold mb-4">PenGame Publishing, LLC · Atlanta, Georgia</p>
            <h1 className="font-heading text-5xl md:text-7xl font-black leading-none mb-4">
              PG <span className="text-[#D4A017]">Leadership</span><br />Academy
            </h1>
            <p className="text-[#F5C842] text-xl md:text-2xl italic mb-4">The 7 Ways to Success Series</p>
            <p className="text-[#F8F5EE]/70 text-lg max-w-2xl mx-auto mb-10">
              Lead with vision. Build with purpose. Win with strategy.<br />
              A complete personal and professional development platform for <strong className="text-[#F8F5EE]">entrepreneurs, creatives, executives, and emerging leaders</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={ENROLL_URL}>
                <Button size="lg" className="bg-[#D4A017] hover:bg-[#F5C842] text-[#050D1A] font-bold px-10 h-12 rounded-full text-base">
                  Start Your Journey <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <button
                onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center border border-[#D4A017]/50 text-[#D4A017] hover:bg-[#D4A017]/10 font-bold px-10 h-12 rounded-full text-base transition-colors"
              >
                Explore Curriculum
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#0A1628] border-y border-[#D4A017]/20 py-8">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {[["7", "Core Programs"], ["49+", "Success Strategies"], ["12", "Week Certification"], ["4", "Cert Tracks"], ["∞", "Lifetime Access"]].map(([val, label]) => (
            <div key={label}>
              <p className="font-heading text-3xl font-black text-[#D4A017]">{val}</p>
              <p className="text-xs uppercase tracking-wider text-[#F8F5EE]/50 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT THE ACADEMY DELIVERS */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-[#D4A017] text-xs uppercase tracking-[0.25em] font-semibold mb-2">Our Core Promise</p>
          <h2 className="font-heading text-3xl md:text-4xl font-black">What the Academy Delivers</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {[
            "Build leadership confidence from the inside out",
            "Develop a winning, recession-ready mindset",
            "Strengthen your personal brand and visibility",
            "Recession-proof your business thinking",
            "Master time, energy, and execution systems",
            "Prepare for AI-driven entrepreneurship",
            "Create long-term success habits that compound",
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-[#0A1628] border border-[#D4A017]/20">
              <Check className="w-5 h-5 text-[#D4A017] shrink-0 mt-0.5" />
              <span className="text-[#F8F5EE]/80">{item}</span>
            </motion.div>
          ))}
        </div>
        <blockquote className="border-l-4 border-[#D4A017] pl-6 py-2 bg-[#0A1628] rounded-r-xl">
          <p className="text-[#F8F5EE]/80 italic text-lg leading-relaxed mb-3">"This isn't just a book series. It's a full leadership transformation system — built for people who are serious about winning in business and in life."</p>
          <cite className="text-[#D4A017] text-sm font-semibold">— Darnell E. Clark, Founder · PenGame Publishing</cite>
        </blockquote>
      </section>

      {/* 7 PILLARS / BOOKS */}
      <section id="curriculum" className="py-20 bg-[#0A1628]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-[#D4A017] text-xs uppercase tracking-[0.25em] font-semibold mb-2">The Series</p>
            <h2 className="font-heading text-3xl md:text-4xl font-black">7 Pillars of Leadership Excellence</h2>
            <p className="text-[#F8F5EE]/60 mt-3">Each book is a course inside the academy.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {BOOKS.map((book, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -8, scale: 1.04 }}
                className="flex flex-col items-center text-center group">
                <div className="w-full aspect-[2/3] rounded-lg overflow-hidden shadow-xl border border-[#D4A017]/20 mb-3">
                  <img src={book.img} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <p className="text-[#F8F5EE]/70 text-xs leading-tight">{book.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATION TRACKS */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-[#D4A017] text-xs uppercase tracking-[0.25em] font-semibold mb-2">Certification Tracks</p>
          <h2 className="font-heading text-3xl md:text-4xl font-black">Find Your Track</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {TRACKS.map((track, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex gap-4 p-6 rounded-2xl bg-[#0A1628] border border-[#D4A017]/20 hover:border-[#D4A017]/60 transition-colors">
              <span className="text-4xl">{track.emoji}</span>
              <div>
                <h3 className="font-heading text-lg font-bold text-[#F5C842] mb-1">{track.title}</h3>
                <p className="text-[#F8F5EE]/60 text-sm">{track.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 12-WEEK CURRICULUM */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-[#D4A017] text-xs uppercase tracking-[0.25em] font-semibold mb-2">12-Week Certification Program</p>
            <h2 className="font-heading text-3xl md:text-4xl font-black">Sample Curriculum Roadmap</h2>
            <p className="text-[#F8F5EE]/60 mt-3">Three phases of structured transformation.</p>
          </motion.div>
          <div className="space-y-4">
            {PHASES.map((phase, i) => (
              <div key={i} className="rounded-2xl border overflow-hidden" style={{ borderColor: phase.color + "40" }}>
                <button
                  onClick={() => setOpenPhase(openPhase === i ? -1 : i)}
                  className="w-full flex items-center justify-between px-6 py-4 bg-[#112240] hover:bg-[#0A1628] transition-colors text-left"
                >
                  <div>
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: phase.color }}>{phase.label}</p>
                    <h3 className="font-heading text-xl font-bold text-[#F8F5EE]">{phase.title}</h3>
                  </div>
                  {openPhase === i ? <ChevronUp className="w-5 h-5 text-[#D4A017]" /> : <ChevronDown className="w-5 h-5 text-[#D4A017]" />}
                </button>
                {openPhase === i && (
                  <div className="grid sm:grid-cols-2 gap-3 p-5 bg-[#050D1A]">
                    {phase.weeks.map((w) => (
                      <div key={w.n} className="flex gap-3 p-4 rounded-xl bg-[#0A1628] border border-[#D4A017]/10">
                        <span className="font-heading text-2xl font-black shrink-0" style={{ color: phase.color }}>{w.n}</span>
                        <div>
                          <p className="font-semibold text-[#F8F5EE] text-sm mb-1">{w.title}</p>
                          <p className="text-[#F8F5EE]/50 text-xs">{w.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href={ENROLL_URL}>
              <Button size="lg" className="bg-[#D4A017] hover:bg-[#F5C842] text-[#050D1A] font-bold px-10 h-12 rounded-full">
                Enroll in 12-Week Program <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-[#D4A017] text-xs uppercase tracking-[0.25em] font-semibold mb-2">Enrollment Options</p>
          <h2 className="font-heading text-3xl md:text-4xl font-black">Choose Your Program</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map((plan, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-6 flex flex-col border ${plan.highlight ? "border-[#D4A017] bg-[#0A1628]" : "border-[#D4A017]/20 bg-[#0A1628]"}`}
            >
              {plan.highlight && <Badge className="bg-[#D4A017] text-[#050D1A] border-0 mb-3 self-start font-bold">Most Popular</Badge>}
              <p className="text-[#D4A017] text-xs uppercase tracking-wider font-semibold mb-1">{plan.tier}</p>
              <h3 className="font-heading text-lg font-black text-[#F8F5EE] mb-1">{plan.title}</h3>
              <p className="text-[#F5C842] text-2xl font-black mb-1">{plan.price}</p>
              <p className="text-[#F8F5EE]/40 text-xs mb-5">{plan.note}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-[#F8F5EE]/80">
                    <Check className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
                {plan.excluded.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-[#F8F5EE]/30 line-through">
                    <Check className="w-4 h-4 text-[#F8F5EE]/20 shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <a href={ENROLL_URL} className="mt-auto">
                <Button className={`w-full font-bold ${plan.highlight ? "bg-[#D4A017] hover:bg-[#F5C842] text-[#050D1A]" : "border border-[#D4A017]/50 text-[#D4A017] bg-transparent hover:bg-[#D4A017]/10"}`}>
                  {plan.cta}
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-[#D4A017] text-xs uppercase tracking-[0.25em] font-semibold mb-2">Student Results</p>
            <h2 className="font-heading text-3xl md:text-4xl font-black">What Leaders Are Saying</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#050D1A] border border-[#D4A017]/20 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-[#D4A017] fill-[#D4A017]" />)}
                </div>
                <p className="text-[#F8F5EE]/70 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-[#F5C842]">{t.name}</p>
                  <p className="text-[#F8F5EE]/40 text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMY DIVISIONS */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-[#D4A017] text-xs uppercase tracking-[0.25em] font-semibold mb-2">Academy Divisions</p>
          <h2 className="font-heading text-3xl md:text-4xl font-black">Under the PG Umbrella</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DIVISIONS.map((d, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="p-5 rounded-2xl bg-[#0A1628] border border-[#D4A017]/20 hover:border-[#D4A017]/60 transition-colors">
              <span className="text-3xl block mb-3">{d.emoji}</span>
              <h3 className="font-heading text-base font-bold text-[#F5C842] mb-2">{d.title}</h3>
              <p className="text-[#F8F5EE]/60 text-sm">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT DARNELL */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-[#D4A017] text-xs uppercase tracking-[0.25em] font-semibold mb-2">About the Academy</p>
            <h2 className="font-heading text-3xl md:text-4xl font-black">Meet Darnell E. Clark</h2>
            <p className="text-[#F8F5EE]/50 mt-2">Author. Entrepreneur. Educator. Community Builder.</p>
          </motion.div>
          <div className="bg-[#050D1A] rounded-2xl border border-[#D4A017]/20 p-8">
            <h3 className="font-heading text-xl font-bold text-[#D4A017] mb-4">Built on Real Experience</h3>
            <p className="text-[#F8F5EE]/70 leading-relaxed mb-4">
              Darnell E. Clark is the founder of PenGame Publishing, LLC — Atlanta's creative force in publishing and educational technology. A serial entrepreneur, author, and community builder, Darnell has developed a portfolio of imprints spanning children's education, immersive technology, AR/VR storytelling, and business development.
            </p>
            <p className="text-[#F8F5EE]/70 leading-relaxed mb-6">
              The 7 Ways to Success Series represents his most concentrated body of leadership wisdom — distilled for ambitious doers ready to move with intention and purpose.
            </p>
            <p className="text-[#F5C842] font-semibold">
              <strong>Mission:</strong> To equip leaders, entrepreneurs, and visionaries with practical, modern success strategies rooted in leadership, branding, innovation, resilience, AI readiness, and personal growth.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#050D1A] to-[#0A1628]">
        <div className="absolute inset-0 bg-[#D4A017]/5 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[#D4A017] text-xs uppercase tracking-[0.3em] font-semibold mb-3">Begin Today</p>
            <h2 className="font-heading text-4xl md:text-5xl font-black mb-4">
              Your Legacy Starts<br /><span className="text-[#D4A017]">with a Decision</span>
            </h2>
            <p className="text-[#F8F5EE]/60 mb-10 text-lg">Join the PG Leadership Academy. Access the complete 7 Ways to Success Series.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={ENROLL_URL}>
                <Button size="lg" className="bg-[#D4A017] hover:bg-[#F5C842] text-[#050D1A] font-bold px-12 h-12 rounded-full text-base">
                  Enroll in the Academy <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="mailto:Info@pengamepublishing.com">
                <Button size="lg" variant="outline" className="border-[#D4A017]/40 text-[#D4A017] hover:bg-[#D4A017]/10 font-bold px-10 h-12 rounded-full text-base">
                  Contact Us
                </Button>
              </a>
            </div>
            <p className="text-[#F8F5EE]/30 text-sm mt-8">
              260 Peachtree Street, Suite 2229 · Atlanta, GA 30303 · 770-585-4678<br />
              www.PenGamePublishing.com · Info@pengamepublishing.com
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}