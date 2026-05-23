import React, { useState, useEffect, useRef } from 'react';

export const CircularGallery = React.forwardRef(
  ({ items, className = "", radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef(null);
    const animationFrameRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        setRotation(scrollProgress * 360);

        scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }, []);

    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling) setRotation(prev => prev + autoRotateSpeed);
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };
      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
    }, [isScrolling, autoRotateSpeed]);

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={className}
        style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", perspective: "2000px" }}
        {...props}
      >
        <div
          style={{
            position: "relative", width: "100%", height: "100%",
            transform: `rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.3, 1 - normalizedAngle / 180);

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                style={{
                  position: "absolute", width: 300, height: 400,
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: "50%", top: "50%",
                  marginLeft: -150, marginTop: -200,
                  opacity, transition: "opacity 0.3s linear",
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 12, overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.6)", border: "1px solid rgba(59,130,246,0.15)", background: "rgba(17,24,39,0.7)", backdropFilter: "blur(10px)" }}>
                  <img
                    src={item.photo.url}
                    alt=""
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: item.photo.pos || "center" }}
                  />

                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
CircularGallery.displayName = "CircularGallery";
