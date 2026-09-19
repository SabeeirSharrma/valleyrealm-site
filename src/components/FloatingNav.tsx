import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

const links: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Terms', href: '/legal/terms' },
  { label: 'Privacy', href: '/legal/privacy' },
];

const ShieldSVG = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 20/18)} viewBox="0 0 18 20" fill="none">
    <path d="M9 0L17 3.5V9C17 14 13.5 18 9 20C4.5 18 1 14 1 9V3.5L9 0Z" stroke="#c8a132" strokeWidth="1.3"/>
    <path d="M9 4L9 14M5.5 9H12.5" stroke="#c8a132" strokeWidth="1"/>
  </svg>
);

export default function FloatingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const navWidth = useTransform(scrollY, [0, 120], ['100%', 'min(740px, 90vw)']);
  const navBorderRadius = useTransform(scrollY, [0, 120], ['0px', '6px']);
  const navTop = useTransform(scrollY, [0, 120], ['0px', '14px']);
  const navPaddingInline = useTransform(scrollY, [0, 120], ['30px', '20px']);
  const navPaddingBlock = useTransform(scrollY, [0, 120], ['16px', '11px']);
  const navBorder = useTransform(
    scrollY,
    [0, 120],
    ['1px solid rgba(200,161,50,0.22)', '1px solid #c8a132']
  );
  const navBoxShadow = useTransform(
    scrollY,
    [0, 120],
    ['none', '0 10px 30px -8px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,161,50,0.15)']
  );

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (v: number) => {
      setIsScrolled(v > 40);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const handleCopyIP = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('mc.valleyrealm.qd.je');
    } catch {
      // silent
    }
  }, []);

  return (
    <>
      <div className="nav-shell">
        <motion.nav
          className="nav"
          style={{
            width: navWidth,
            borderRadius: navBorderRadius,
            top: navTop,
            paddingLeft: navPaddingInline,
            paddingRight: navPaddingInline,
            paddingTop: navPaddingBlock,
            paddingBottom: navPaddingBlock,
            border: navBorder,
            boxShadow: navBoxShadow,
          }}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="/" className="nav-mark">
            <ShieldSVG size={18} />
            ValleyRealm
          </a>

          <div className={`nav-links ${mobileOpen ? 'nav-links--open' : ''}`}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button className="nav-ip-btn" onClick={handleCopyIP}>
              mc.valleyrealm.qd.je
            </button>
          </div>

          <div className="nav-status">
            <span className="nav-pulse" />
            Server Online
          </div>

          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.nav>
      </div>

      <style>{`
        .nav-shell {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 40;
          display: flex;
          justify-content: center;
          pointer-events: none;
        }

        .nav {
          pointer-events: auto;
          width: 100%;
          max-width: 1040px;
          margin-top: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(180deg, rgba(23,21,27,0.9), rgba(23,21,27,0.78));
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--hairline);
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .nav-mark {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: "Cinzel", serif;
          font-weight: 600;
          font-size: 1.02rem;
          letter-spacing: 0.03em;
          color: var(--cream);
          white-space: nowrap;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-link {
          padding: 8px 14px;
          border-radius: 3px;
          font-family: "EB Garamond", serif;
          font-size: 0.92rem;
          color: var(--cream-dim);
          transition: background 0.2s ease, color 0.2s ease;
          text-decoration: none;
        }

        .nav-link:hover {
          background: rgba(241,231,207,0.06);
          color: var(--cream);
        }

        .nav-ip-btn {
          padding: 6px 14px;
          background: rgba(200,161,50,0.12);
          color: var(--gold-bright);
          border: 1px solid var(--hairline);
          border-radius: 3px;
          font-family: "Cinzel", serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .nav-ip-btn:hover {
          background: rgba(200,161,50,0.2);
          border-color: var(--gold);
        }

        .nav-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: "EB Garamond", serif;
          font-size: 0.88rem;
          color: var(--cream-dim);
          padding: 5px 14px;
          background: rgba(200,161,50,0.08);
          border: 1px solid var(--hairline);
        }

        .nav-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--forest);
          box-shadow: 0 0 6px 1px rgba(70,96,63,0.8);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .nav-mobile-toggle {
          display: none;
          padding: 8px;
          color: var(--cream-dim);
        }

        @media (max-width: 720px) {
          .nav-links {
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            flex-direction: column;
            background: var(--stone);
            padding: 16px 28px;
            gap: 8px;
            box-shadow: 0 10px 30px -8px rgba(0,0,0,0.6);
            transform: translateY(-120%);
            opacity: 0;
            pointer-events: none;
            transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                        opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            border-bottom: 1px solid var(--hairline);
          }

          .nav-links--open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
          }

          .nav-mobile-toggle {
            display: flex;
          }

          .nav-status {
            display: none;
          }

          .nav {
            width: 100% !important;
            border-radius: 0 !important;
            top: 0 !important;
          }
        }

        @media (max-width: 480px) {
          .nav-mark {
            font-size: 0.9rem;
            gap: 8px;
          }
        }
      `}</style>
    </>
  );
}
