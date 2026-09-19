import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface Rule {
  numeral: string;
  title: string;
  description: string;
  accent: string;
}

const accents = ['#c8a132', '#46603f', '#7c2a34'];

const rules: Rule[] = [
  {
    numeral: 'I',
    title: 'Be Respectful',
    description: 'No harassment, bullying, discrimination, or targeted toxicity. Keep disagreements civil.',
    accent: accents[0],
  },
  {
    numeral: 'II',
    title: 'Respect Builds & Belongings',
    description: "No griefing or stealing. What someone builds is theirs unless they say otherwise.",
    accent: accents[1],
  },
  {
    numeral: 'III',
    title: 'PvP & Player Interaction',
    description: "PvP should be consensual — no killing or trapping players who don't want to fight.",
    accent: accents[2],
  },
  {
    numeral: 'IV',
    title: 'No Cheating or Exploiting',
    description: "No hacked clients or unfair advantages. Allowed mods shouldn't tip the scales.",
    accent: accents[0],
  },
  {
    numeral: 'V',
    title: 'Keep Chat Friendly',
    description: 'No spam, no offensive content, no unrelated advertising. Keep it welcoming.',
    accent: accents[1],
  },
  {
    numeral: 'VI',
    title: "Don't Impersonate Others",
    description: "Staff will never ask for your password. Don't pretend to be staff or another player.",
    accent: accents[2],
  },
  {
    numeral: 'VII',
    title: 'Respect Staff & Report Problems',
    description: 'Report bugs and griefing rather than abusing them. Discuss decisions calmly.',
    accent: accents[0],
  },
  {
    numeral: 'VIII',
    title: 'Use Common Sense',
    description: "Not everything fits a rule. If it goes against ValleyRealm's spirit, don't do it.",
    accent: accents[1],
  },
];

function RuleCard({ rule, index }: { rule: Rule; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className="rule-card"
      style={{ '--accent': rule.accent } as React.CSSProperties}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.05, 0.7, 0.1, 1],
      }}
    >
      <div className="num">{rule.numeral}</div>
      <h3>{rule.title}</h3>
      <p>{rule.description}</p>
    </motion.div>
  );
}

export default function RulesSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  return (
    <section className="rules">
      <div className="wrap">
        <motion.div
          ref={headingRef}
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.05, 0.7, 0.1, 1] }}
        >
          <span className="ribbon">The Decree</span>
          <h2>ValleyRealm Rules</h2>
          <p>We're here to build, explore, and keep this a genuinely friendly place — fair for everyone</p>
        </motion.div>

        <div className="rules-grid">
          {rules.map((rule, i) => (
            <RuleCard key={rule.title} rule={rule} index={i} />
          ))}
        </div>

        <div className="rules-foot">
          ❦ Be kind. Have fun. Build cool things. Make friends. ❦
        </div>
      </div>

      <style>{`
        .rules {
          padding: 90px 0;
          position: relative;
          z-index: 1;
        }

        .rules-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        @media (max-width: 680px) {
          .rules-grid {
            grid-template-columns: 1fr;
          }
        }

        .rule-card {
          background: var(--stone);
          border: 1px solid var(--hairline);
          border-top: 2px solid var(--accent, var(--gold));
          padding: 24px 26px;
          transition: box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease;
        }

        .rule-card:hover {
          background: var(--stone-hi);
          box-shadow: 0 14px 30px -14px rgba(0,0,0,0.6);
        }

        .rule-card .num {
          font-family: "Cinzel", serif;
          font-size: 0.75rem;
          color: var(--gold);
          letter-spacing: 0.1em;
        }

        .rule-card h3 {
          font-size: 1.08rem;
          margin-top: 8px;
          color: var(--cream);
        }

        .rule-card p {
          margin-top: 9px;
          font-size: 0.96rem;
          color: var(--cream-dim);
        }

        .rules-foot {
          margin-top: 30px;
          padding: 26px 30px;
          text-align: center;
          background: linear-gradient(135deg, rgba(200,161,50,0.1), rgba(124,42,52,0.1));
          border: 1px solid var(--hairline);
          font-family: "Cinzel", serif;
          font-size: 1rem;
          letter-spacing: 0.02em;
          color: var(--gold-bright);
        }

        @media (max-width: 480px) {
          .rule-card {
            padding: 18px 20px;
          }
          .rules-foot {
            padding: 20px 16px;
            font-size: 0.88rem;
          }
        }
      `}</style>
    </section>
  );
}
