import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export default function WelcomeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="welcome">
      <div className="wrap">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.05, 0.7, 0.1, 1] }}
        >
          <div className="section-head">
            <span className="ribbon">Welcome</span>
            <h2>A Cozy Little Kingdom</h2>
            <p>A friendly Minecraft community where you can build, explore, and make friends</p>
          </div>
          <div className="parchment-card">
            <p>Whether you're starting your first home, exploring the world with friends, or just looking for somewhere chill to play — there's a place for you here.</p>
            <p className="signoff">Come build something with us.</p>
          </div>
        </motion.div>
      </div>

      <style>{`
        .welcome {
          padding: 90px 0;
          position: relative;
          z-index: 1;
        }

        .parchment-card {
          background: var(--parchment);
          color: var(--ink);
          border-radius: 4px;
          padding: 50px 48px 40px;
          box-shadow: 0 18px 40px -12px rgba(0,0,0,0.55);
          position: relative;
          clip-path: polygon(
            0% 1.4%, 4% 0%, 12% 1.1%, 20% 0.2%, 28% 1.3%, 36% 0.1%, 44% 1%, 52% 0.2%,
            60% 1.2%, 68% 0.3%, 76% 1.1%, 84% 0.2%, 92% 1.3%, 100% 0.4%,
            100% 100%, 0% 100%
          );
        }

        .parchment-card p {
          font-size: 1.14rem;
          color: var(--ink-soft);
          max-width: 58ch;
          margin: 0 auto;
          text-align: center;
        }

        .parchment-card .signoff {
          color: var(--wine);
          font-family: "Cinzel", serif;
          font-weight: 600;
          font-size: 1.1rem;
          margin-top: 24px;
          letter-spacing: 0.02em;
        }

        @media (max-width: 768px) {
          .parchment-card {
            padding: 36px 28px 30px;
          }
        }

        @media (max-width: 480px) {
          .parchment-card {
            padding: 28px 20px 24px;
          }
        }
      `}</style>
    </section>
  );
}
