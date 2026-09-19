import { useCallback } from 'react';

const CrestSVG = () => (
  <svg width="46" height="52" viewBox="0 0 46 52" fill="none">
    <path d="M23 0L44 9V26C44 37 35.5 46 23 52C10.5 46 2 37 2 26V9L23 0Z" stroke="#c8a132" strokeWidth="1.4"/>
    <path d="M23 10L23 32M13 21H33" stroke="#c8a132" strokeWidth="1.2"/>
    <circle cx="23" cy="21" r="4" stroke="#c8a132" strokeWidth="1"/>
  </svg>
);

export default function HeroSection() {
  const handleCopyIP = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('mc.valleyrealm.qd.je');
    } catch {
      // silent
    }
  }, []);

  return (
    <section className="hero">
      <div className="hero-glow" />
      <div className="wrap hero-inner">
        <div className="crest">
          <CrestSVG />
        </div>
        <h1>A cozy corner of the realm, <span>waiting on you.</span></h1>
        <p className="lede">Whether you're building your first hall or seeking somewhere quiet to settle — there's a place for you at ValleyRealm.</p>
        <div className="hero-actions">
          <a href="#connect" className="btn btn-primary">Enter the Realm</a>
          <a href="https://discord.valleyrealm.qd.je" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">Join our Discord</a>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 150px 0 100px;
          overflow: hidden;
        }

        .hero-glow {
          position: absolute;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 700px;
          background: radial-gradient(ellipse at top, rgba(200,161,50,0.16) 0%, transparent 62%);
          pointer-events: none;
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 720px;
          margin: 0 auto;
        }

        .crest {
          margin: 0 auto 26px;
          opacity: 0;
          transform: translateY(14px);
          animation: rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0s forwards;
        }

        .hero h1 {
          font-family: "Cinzel Decorative", "Cinzel", serif;
          font-size: clamp(2.4rem, 6vw, 4rem);
          line-height: 1.1;
          color: var(--cream);
          opacity: 0;
          transform: translateY(18px);
          animation: rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards;
        }

        .hero h1 span {
          color: var(--gold-bright);
        }

        .hero .lede {
          margin: 24px auto 0;
          font-size: 1.24rem;
          font-style: italic;
          color: var(--cream-dim);
          max-width: 46ch;
          opacity: 0;
          transform: translateY(18px);
          animation: rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.32s forwards;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          margin-top: 40px;
          justify-content: center;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(18px);
          animation: rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.48s forwards;
        }

        @keyframes rise {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 120px 0 70px;
          }
        }

        @media (max-width: 480px) {
          .hero {
            padding: 100px 0 50px;
          }
        }
      `}</style>
    </section>
  );
}
