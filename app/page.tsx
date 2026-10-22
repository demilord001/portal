"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BrainCircuit, Globe2, Layers3, Sparkles } from "lucide-react";

const features = [
  [BrainCircuit, "Think alongside you", "A fast, fluent assistant for ideas, decisions, code, and the questions between them."],
  [Globe2, "Find the signal", "Current context enters the conversation only when it makes your answer better."],
  [Layers3, "Your work, connected", "Keep conversations, files, and Notebook projects together in one calm workspace."],
] as const;

export default function Home() {
  return <motion.main className="portal-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7 }}><div className="ambient ambient-one"/><div className="ambient ambient-two"/><div className="grid-lines"/>
    <nav className="site-nav"><Link href="/" className="wordmark"><span className="logo-mark">✦</span><span>portal<span className="muted-dot">.</span>ai</span></Link><div className="nav-links"><a href="#capabilities">Capabilities</a><a href="#vision">Our vision</a><Link href="/sign-in">Sign in</Link><Link href="/sign-up" className="nav-cta">Get started <ArrowUpRight size={15}/></Link></div></nav>
    <motion.section className="hero container" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: "easeOut" }}><div className="hero-copy"><div className="eyebrow"><span className="pulse"/> A new dimension of assistance <span className="eyebrow-date">Est. 01.09.26</span></div><h1>Meet your mind<br/><em>in motion.</em></h1><p className="hero-lede">Portal.AI brings your thinking, making, and discovering into one intelligent space. Ask anything. Build anything. Go further.</p><div className="hero-actions"><Link href="/sign-up" className="primary-button">Enter the portal <ArrowUpRight size={17}/></Link><a className="text-button" href="#capabilities">Explore capabilities <span>↓</span></a></div><div className="trusted"><span>BUILT FOR THE CURIOUS</span><div><span>ideas</span><span>research</span><span>creation</span><span>momentum</span></div></div></div><motion.div className="orb-stage" aria-hidden="true" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}><div className="orb-shadow"/><div className="orb"><div className="orb-core"/><div className="orb-ring ring-a"/><div className="orb-ring ring-b"/><div className="orb-ring ring-c"/><span className="orb-label label-top">CONTEXT</span><span className="orb-label label-right">CLARITY</span><span className="orb-label label-bottom">MOMENTUM</span></div><div className="float-card card-a"><Sparkles size={14}/> deeply personal</div><div className="float-card card-b"><span className="mini-pulse"/> always in flow</div></motion.div></motion.section>
    <section id="capabilities" className="capabilities container"><div className="section-intro"><span className="section-kicker">THE PORTAL EFFECT</span><h2>More than answers.<br/><span>A place to begin.</span></h2></div><div className="feature-grid">{features.map(([Icon, title, text]) => <article className="feature-card" key={title}><div className="icon-wrap"><Icon size={20}/></div><h3>{title}</h3><p>{text}</p><span className="card-arrow">↗</span></article>)}</div></section>
    <section id="vision" className="vision container"><div className="vision-panel"><div><span className="section-kicker">MADE AT DEMLABS</span><h2>The best tool is the one that gets out of your way.</h2></div><p>Portal.AI was founded by Luis Dem on September 1, 2026 with a simple belief: powerful technology should feel natural, expansive, and unmistakably yours.</p><Link href="/sign-up" className="round-arrow"><ArrowUpRight size={22}/></Link></div></section>
    <section className="final-cta container"><span className="section-kicker">YOUR NEXT MOVE</span><h2>Open a new<br/><em>possibility.</em></h2><Link href="/sign-up" className="primary-button">Start exploring <ArrowUpRight size={17}/></Link></section>
    <footer><span className="wordmark"><span className="logo-mark">✦</span><span>portal<span className="muted-dot">.</span>ai</span></span><span>Ultimate access to next-gen assistance.</span><span>© 2026 DemLabs</span></footer>
  </motion.main>;
}
