import { useState, useCallback, useRef } from 'react';
import { motion, useInView } from 'motion/react';

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // silent
    }
  }, [text]);

  return (
    <button className="copy-btn" onClick={handleCopy} aria-label={`Copy ${label}`}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function IpSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="ip-section">
      <div className="wrap">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.05, 0.7, 0.1, 1] }}
        >
          <div className="section-head">
            <span className="ribbon">The Gates</span>
            <h2>Ready When You Are</h2>
            <p>Java or Bedrock, the gates are open — copy the address for your edition and step through</p>
          </div>

          <div className="connect-grid">
            <motion.div
              className="connect-card"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.05, 0.7, 0.1, 1] }}
            >
              <span className="tag">Java Edition</span>
              <p className="note">Just paste in this address and join.</p>
              <div className="addr-row">
                <span className="val">mc.valleyrealm.qd.je</span>
                <CopyButton text="mc.valleyrealm.qd.je" label="Java IP" />
              </div>
            </motion.div>

            <motion.div
              className="connect-card"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.05, 0.7, 0.1, 1] }}
            >
              <span className="tag">Bedrock Edition</span>
              <p className="note">This is the address, this is the port you can join through.</p>
              <div className="addr-row">
                <span className="val">mc.valleyrealm.qd.je</span>
                <CopyButton text="mc.valleyrealm.qd.je" label="Bedrock IP" />
              </div>
              <div className="addr-row">
                <span className="val">Port: 19132</span>
                <CopyButton text="19132" label="Bedrock Port" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .ip-section {
          padding: 90px 0;
          position: relative;
          z-index: 1;
        }

        .connect-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        @media (max-width: 680px) {
          .connect-grid {
            grid-template-columns: 1fr;
          }
        }

        .connect-card {
          background: var(--stone);
          border: 1px solid var(--hairline);
          padding: 28px;
          position: relative;
        }

        .connect-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .connect-card .tag {
          display: inline-block;
          font-family: "Cinzel", serif;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: var(--gold-bright);
          background: rgba(200,161,50,0.1);
          padding: 5px 12px;
          border: 1px solid var(--hairline);
          margin-bottom: 16px;
        }

        .connect-card .note {
          margin: 12px 0 18px;
          color: var(--cream-dim);
          font-style: italic;
          font-size: 0.98rem;
        }

        .addr-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          background: var(--stone-dark);
          border: 1px solid var(--hairline);
          padding: 13px 15px;
          margin-bottom: 8px;
        }

        .addr-row:last-child {
          margin-bottom: 0;
        }

        .addr-row .val {
          font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
          font-size: 0.92rem;
          color: var(--cream);
          letter-spacing: -0.01em;
        }

        .copy-btn {
          background: rgba(200,161,50,0.1);
          border: 1px solid var(--hairline);
          color: var(--gold-bright);
          font-family: "Cinzel", serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 6px 13px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .copy-btn:hover {
          background: rgba(200,161,50,0.18);
          border-color: var(--gold);
        }

        @media (max-width: 480px) {
          .connect-card {
            padding: 22px 18px;
          }
          .addr-row {
            padding: 11px 12px;
          }
          .addr-row .val {
            font-size: 0.84rem;
            word-break: break-all;
          }
        }
      `}</style>
    </section>
  );
}
