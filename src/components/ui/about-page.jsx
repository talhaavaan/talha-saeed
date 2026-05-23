import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const defaultAchievements = [
  { label: "Projects Completed", value: "100+" },
  { label: "Happy Clients", value: "50+" },
  { label: "Total Views", value: "2M+" },
  { label: "Years Experience", value: "3+" },
];

const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 600;

export default function AboutPage({ achievements = defaultAchievements }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      {/* HERO IMAGE SECTION */}
      <section style={{ padding: "clamp(2rem,5vw,4rem) 0 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.2rem,4vw,2rem)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <img
            style={{ borderRadius: 12, objectFit: "cover", objectPosition: "center 30%", width: "100%", height: "clamp(180px,30vw,440px)" }}
            src="/talha-about.jpg"
            alt="Talha — Creative Director"
          />
          {/* Headline + CTA — stacks on mobile */}
          <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", alignItems: "start" }}>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.8rem,5vw,3rem)", lineHeight: 1.05, color: "#F8FAFC", margin: 0 }}>
              The{" "}
              <span style={{ background: "linear-gradient(135deg,#3B82F6,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                creative ecosystem
              </span>{" "}
              <span style={{ color: "rgba(209,213,219,0.5)" }}>
                that drives results across every platform.
              </span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(.8rem,2vw,.88rem)", lineHeight: 1.9, color: "rgba(209,213,219,0.55)", margin: 0 }}>
                From Shopify stores and Meta ads to Airbnb listings and cinematic edits — every project is approached with a deep understanding of aesthetics, data, and cultural context.
              </p>
              <a
                href="#contact"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 4, alignSelf: "flex-start",
                  fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.72rem", letterSpacing: "0.12em",
                  textTransform: "uppercase", color: "#050505",
                  background: "linear-gradient(135deg,#3B82F6,#22D3EE)",
                  border: "none", padding: "0.55rem 1.1rem 0.55rem 1.3rem", borderRadius: 100,
                  textDecoration: "none", fontWeight: 700,
                  transition: "transform .3s, box-shadow .3s",
                }}
              >
                <span>Let's Work</span>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT BODY */}
      <section style={{ padding: "2rem 0 clamp(3rem,6vw,5rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.2rem,4vw,2rem)", display: "flex", flexDirection: "column", gap: "clamp(2rem,4vw,3.5rem)" }}>

          {/* Heading row — stacks on mobile */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", alignItems: "start" }}>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2rem,6vw,4rem)", color: "#F8FAFC", margin: 0, lineHeight: 1 }}>
              About Me
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(.8rem,2vw,.88rem)", lineHeight: 1.9, color: "rgba(209,213,219,0.5)", margin: 0 }}>
              Talha is a creative director and digital strategist based in Pakistan, building brands, running high-ROI ad campaigns, and crafting cinematic content that converts.
            </p>
          </div>

          {/* Stats — 2 cols on mobile, 4 on desktop */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "1px", background: "rgba(59,130,246,0.1)" }}>
            {achievements.map((a) => (
              <div key={a.label} style={{ padding: "clamp(1.2rem,3vw,1.8rem) clamp(1rem,2vw,1.4rem)", background: "#050505" }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.8rem,5vw,2.5rem)", letterSpacing: "0.03em", background: "linear-gradient(135deg,#3B82F6,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>
                  {a.value}
                </div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(.55rem,1.5vw,.62rem)", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(209,213,219,0.35)", marginTop: "0.4rem" }}>
                  {a.label}
                </div>
              </div>
            ))}
          </div>

          {/* Three card row — stacks to column on mobile */}
          <div className="about-cards-row">

            {/* Left big portrait */}
            <div className="about-portrait-wrap">
              <img
                src="/talha.jpg"
                alt="Talha portrait"
                style={{ borderRadius: 12, objectFit: "cover", objectPosition: "center top", width: "100%", height: "100%", minHeight: 240, display: "block", filter: "brightness(0.88) contrast(1.05)" }}
                onError={e => { e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"; }}
              />
            </div>

            {/* Right two cards */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.2rem", minWidth: 0 }}>

              {/* Card 1 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                style={{ position: "relative", overflow: "hidden", borderRadius: 12, background: "#0a0e17", border: "1px solid rgba(59,130,246,0.15)", color: "#F8FAFC", boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }}
              >
                <div style={{ position: "relative", height: "clamp(120px,18vw,180px)", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(49,46,129,.7),rgba(37,99,235,.4))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3rem,8vw,5rem)", color: "rgba(34,211,238,0.15)", letterSpacing: "0.1em" }}>GROW</span>
                  </div>
                  <div style={{ position: "absolute", bottom: 0, height: 60, width: "100%", background: "linear-gradient(to top, #0a0e17, transparent)" }} />
                </div>
                <div style={{ padding: "1rem 1.2rem 1.4rem" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(.95rem,2.5vw,1.1rem)", fontWeight: 700, margin: 0, marginBottom: "0.4rem" }}>Accelerate Growth</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(.72rem,2vw,.78rem)", color: "rgba(209,213,219,0.55)", margin: 0, lineHeight: 1.7 }}>
                    Data-driven campaigns engineered for measurable ROI across every platform.
                  </p>
                  <a href="#services" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: ".9rem", fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#22D3EE", textDecoration: "none", borderBottom: "1px solid rgba(34,211,238,0.3)", paddingBottom: 2 }}>
                    View Services
                  </a>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                style={{ position: "relative", overflow: "hidden", borderRadius: 12, minHeight: "clamp(120px,15vw,200px)", border: "1px solid rgba(59,130,246,0.1)" }}
              >
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(34,211,238,.12),rgba(37,99,235,.3))" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.2rem", background: "linear-gradient(to top, rgba(5,5,5,0.92), transparent)", color: "#F8FAFC" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(.9rem,2.5vw,1.05rem)", fontWeight: 700, margin: 0, marginBottom: "0.3rem" }}>Future-Ready Design</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(.7rem,2vw,.75rem)", color: "rgba(209,213,219,0.65)", margin: 0, lineHeight: 1.6 }}>
                    Intuitive, scalable aesthetics combining beauty with functionality.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
