"use client";

import { useEffect, useRef } from "react";

const phrases = [
  "crafting intuitive flows",
  "designing with empathy",
  "making users smile",
  "solving real problems",
  "building beautiful things",
];

export default function Hero() {
  const typingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let pi = 0;
    let ci = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    function type() {
      const phrase = phrases[pi];
      if (!deleting) {
        ci++;
        if (typingRef.current) typingRef.current.textContent = phrase.slice(0, ci);
        if (ci === phrase.length) {
          deleting = true;
          timeout = setTimeout(type, 1800);
          return;
        }
      } else {
        ci--;
        if (typingRef.current) typingRef.current.textContent = phrase.slice(0, ci);
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
        }
      }
      timeout = setTimeout(type, deleting ? 50 : 80);
    }

    type();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-[60px] pt-[120px] pb-[80px] overflow-hidden bg-cream">
      {/* Floating blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full opacity-45"
          style={{
            background: "var(--pink-soft)",
            filter: "blur(60px)",
            animation: "floatBlob 9s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute bottom-[60px] -left-[60px] w-[280px] h-[280px] rounded-full opacity-45"
          style={{
            background: "var(--pink-light)",
            filter: "blur(60px)",
            animation: "floatBlob 11s ease-in-out infinite alternate",
            animationDelay: "-3s",
          }}
        />
        <div
          className="absolute top-[40%] left-[30%] w-[200px] h-[200px] rounded-full opacity-15"
          style={{
            background: "var(--green)",
            filter: "blur(60px)",
            animation: "floatBlob 13s ease-in-out infinite alternate",
            animationDelay: "-6s",
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center max-w-[1100px] w-full relative z-10">
        {/* Text */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <div
            className="inline-flex items-center gap-2 bg-pink-light text-green text-[0.82rem] font-semibold px-4 py-1.5 rounded-full mb-6 tracking-[0.05em] uppercase opacity-0"
            style={{ animation: "fadeUp 0.7s 0.2s forwards" }}
          >
            Available for work
          </div>

          <h1
            className="font-heading text-[clamp(2.8rem,5vw,4.2rem)] font-bold leading-[1.1] text-dark mb-0 opacity-0"
            style={{ animation: "fadeUp 0.8s 0.4s forwards" }}
          >
            Hi, I&apos;m <span className="text-green italic">Pim</span>
            <br />
            UX/UI Designer
          </h1>

          <p
            className="text-[1.1rem] text-mid mt-5 mb-9 leading-[1.7] max-w-[420px] mx-auto lg:mx-0 opacity-0"
            style={{ animation: "fadeUp 0.8s 0.6s forwards" }}
          >
            I craft digital experiences that feel like a warm hug —
            <br />
            I love{" "}
            <span
              ref={typingRef}
              className="text-green font-semibold border-r-2 border-green pr-0.5"
            />
          </p>

          <div
            className="flex gap-4 flex-wrap justify-center lg:justify-start opacity-0"
            style={{ animation: "fadeUp 0.8s 0.8s forwards" }}
          >
            <a
              href="/#work"
              className="inline-block bg-green text-white px-8 py-3.5 rounded-full font-semibold text-[0.95rem] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_30px_rgba(134,167,136,0.4)]"
            >
              View My Work
            </a>
            <a
              href="#"
              className="inline-block bg-transparent text-dark border-2 border-pink-soft px-8 py-3.5 rounded-full font-semibold text-[0.95rem] transition-all duration-200 hover:border-green hover:text-green hover:-translate-y-[3px]"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Photo blob */}
        <div
          className="order-1 lg:order-2 flex justify-center items-center relative opacity-0"
          style={{ animation: "fadeUp 0.9s 0.5s forwards" }}
        >
          <div
            className="w-[320px] h-[320px] lg:w-[380px] lg:h-[380px] flex items-center justify-center relative"
            style={{
              background: "linear-gradient(135deg, var(--pink-soft), var(--pink-light))",
              animation: "morphBlob 8s ease-in-out infinite",
              borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
            }}
          >
            <div
              className="w-[270px] h-[270px] lg:w-[320px] lg:h-[320px] overflow-hidden flex items-center justify-center border-4 border-white shadow-[0_20px_60px_rgba(134,167,136,0.25)]"
              style={{
                background: "linear-gradient(160deg, var(--green) 0%, #b8d4b9 100%)",
                animation: "morphBlob 8s ease-in-out infinite reverse",
                borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
              }}
            >
              <div className="text-center text-white p-5">
                <div className="text-5xl mb-3">🌿</div>
                <p className="text-[0.85rem] font-medium leading-[1.5] opacity-90">
                  <strong>Siripat Anukool</strong>
                  <br />
                  &ldquo;Pim&rdquo;
                </p>
              </div>
            </div>
            {/* Decorative circles */}
            <div
              className="absolute -top-5 -right-5 w-[70px] h-[70px] bg-green rounded-full opacity-20"
              style={{ animation: "floatBlob 5s ease-in-out infinite alternate" }}
            />
            <div
              className="absolute bottom-2.5 -left-[30px] w-[50px] h-[50px] bg-pink-soft rounded-full"
              style={{ animation: "floatBlob 7s ease-in-out infinite alternate-reverse" }}
            />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-mid text-[0.8rem] tracking-[0.08em] uppercase opacity-60"
        style={{ animation: "bounce 2s ease-in-out infinite" }}
      >
        Scroll
        <span className="text-[1.2rem]">&darr;</span>
      </div>
    </section>
  );
}
