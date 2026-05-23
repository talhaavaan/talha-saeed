import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const cardVariantStyles = {
  default: { bg: "rgba(17,24,39,0.92)", border: "rgba(59,130,246,0.18)", text: "#F8FAFC", sub: "rgba(209,213,219,0.55)" },
  red:     { bg: "rgba(185,28,28,0.88)", border: "rgba(248,113,113,0.3)", text: "#fff", sub: "rgba(255,255,255,0.75)" },
  blue:    { bg: "rgba(29,78,216,0.88)", border: "rgba(96,165,250,0.3)", text: "#fff", sub: "rgba(255,255,255,0.75)" },
  gray:    { bg: "rgba(31,41,55,0.92)", border: "rgba(75,85,99,0.35)", text: "#F8FAFC", sub: "rgba(209,213,219,0.55)" },
};

export const ServiceCard = React.forwardRef(
  ({ className = "", variant = "default", title, href, imgSrc, imgAlt, num, tag, desc, ...props }, ref) => {
    const v = cardVariantStyles[variant] || cardVariantStyles.default;

    const arrowAnim = {
      hover: { x: 5, transition: { duration: 0.3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" } },
    };

    return (
      <motion.div
        ref={ref}
        className={className}
        style={{
          position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between",
          width: "100%", padding: "1.6rem 1.4rem", overflow: "hidden", borderRadius: 14,
          background: v.bg, border: `1px solid ${v.border}`, color: v.text,
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)", minHeight: 190,
          cursor: "none",
        }}
        whileHover={{ scale: 1.025, transition: { duration: 0.3 } }}
        {...props}
      >
        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", height: "100%" }}>
          {num && (
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "0.7rem", letterSpacing: "0.3em", color: "rgba(34,211,238,0.5)", marginBottom: "0.5rem" }}>
              {num}
            </div>
          )}
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-0.01em", color: v.text, margin: 0, marginBottom: desc ? "0.6rem" : 0 }}>
            {title}
          </h3>
          {desc && (
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", lineHeight: 1.75, color: v.sub, margin: 0, marginBottom: "1rem", flexGrow: 1 }}>
              {desc}
            </p>
          )}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
            {tag && (
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(34,211,238,0.8)", borderBottom: "1px solid rgba(34,211,238,0.25)", paddingBottom: 1 }}>
                {tag}
              </span>
            )}
            {href && (
              <motion.a
                href={href}
                aria-label={`Learn more about ${title}`}
                style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(34,211,238,0.85)", textDecoration: "none", marginLeft: "auto" }}
                variants={arrowAnim}
                whileHover="hover"
              >
                More <ArrowRight size={13} />
              </motion.a>
            )}
          </div>
        </div>

        {imgSrc && (
          <img
            src={imgSrc}
            alt={imgAlt || title}
            style={{ position: "absolute", right: -20, bottom: -20, width: 120, height: 120, objectFit: "contain", opacity: 0.12, pointerEvents: "none" }}
          />
        )}
      </motion.div>
    );
  }
);
ServiceCard.displayName = "ServiceCard";
