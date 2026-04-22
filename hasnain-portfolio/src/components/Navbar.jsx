



import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { NAV_LINKS } from '../constants'
import { S } from '../constants/styles'

/* ── Magnetic button hook ── */
function useMagnetic(strength = 0.35) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return { ref, sx, sy, onMove, onLeave }
}

/* ── Glitch text on hover ── */
function GlitchText({ text, active, accent }) {
  const [glitch, setGlitch] = useState(false)
  const chars = '01アイウエ#@%'

  const scramble = () => {
    setGlitch(true)
    setTimeout(() => setGlitch(false), 400)
  }

  return (
    <span
      onMouseEnter={scramble}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          animate={glitch ? {
            y: [0, -2, 1, 0],
            opacity: [1, 0.6, 1],
            color: [active ? accent : '#8899aa', '#fff', active ? accent : '#8899aa'],
          } : {}}
          transition={{ duration: 0.25, delay: i * 0.03 }}
          style={{ display: 'inline-block', color: active ? accent : '#7a8fa6' }}
        >
          {glitch && Math.random() > 0.7 ? chars[Math.floor(Math.random() * chars.length)] : ch}
        </motion.span>
      ))}
    </span>
  )
}

/* ── Nav link with pill indicator ── */
function NavLink({ link, active, onClick, index }) {
  const isActive = active === link

  return (
    <motion.a
      href={`#${link.toLowerCase()}`}
      onClick={() => onClick(link)}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        textDecoration: 'none',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: '0.04em',
        fontFamily: 'DM Sans, sans-serif',
        cursor: 'pointer',
        padding: '6px 4px',
      }}
    >
      {/* Active background pill */}
      {isActive && (
        <motion.div
          layoutId="nav-pill"
          style={{
            position: 'absolute',
            inset: '-6px -14px',
            borderRadius: 10,
            background: 'rgba(0,229,160,0.08)',
            border: '1px solid rgba(0,229,160,0.18)',
            zIndex: -1,
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        />
      )}

      <GlitchText text={link} active={isActive} accent={S.accent} />

      {/* Dot indicator */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ width: 4, height: 4, borderRadius: '50%', background: S.accent, boxShadow: `0 0 8px ${S.accent}` }}
      />
    </motion.a>
  )
}

/* ── Mobile drawer ── */
function MobileMenu({ open, links, active, onSelect, accent }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            top: 76,
            left: 16,
            right: 16,
            background: 'rgba(8,12,20,0.97)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(0,229,160,0.15)',
            borderRadius: 16,
            padding: '12px 8px',
            zIndex: 300,
            boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
          }}
        >
          {/* Corner accents */}
          {[
            { top: -1, left: -1, borderTop: '2px solid', borderLeft: '2px solid' },
            { top: -1, right: -1, borderTop: '2px solid', borderRight: '2px solid' },
            { bottom: -1, left: -1, borderBottom: '2px solid', borderLeft: '2px solid' },
            { bottom: -1, right: -1, borderBottom: '2px solid', borderRight: '2px solid' },
          ].map((style, i) => (
            <div key={i} style={{ position: 'absolute', width: 12, height: 12, borderColor: accent, borderRadius: 2, ...style }} />
          ))}

          {links.map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => onSelect(link)}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 20px',
                borderRadius: 10,
                textDecoration: 'none',
                color: active === link ? accent : '#8899aa',
                fontSize: 15,
                fontWeight: 600,
                fontFamily: 'DM Sans, sans-serif',
                background: active === link ? 'rgba(0,229,160,0.07)' : 'transparent',
                borderLeft: active === link ? `2px solid ${accent}` : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              <span style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: 10,
                color: active === link ? accent : '#3a4a5a',
                letterSpacing: '0.1em',
              }}>
                0{i + 1}
              </span>
              {link}
              {active === link && (
                <motion.div
                  style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: accent, boxShadow: `0 0 10px ${accent}` }}
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.a>
          ))}

          <div style={{ margin: '10px 12px 4px', padding: '4px 0 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: '100%', padding: '13px',
                background: `linear-gradient(135deg, ${S.accent}, #00b87a)`,
                color: '#020d07', border: 'none', borderRadius: 10,
                fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 700,
                cursor: 'pointer', letterSpacing: '0.02em',
              }}
            >
              Book a Consultation →  

              
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ════════════════════════════════════════
   MAIN NAVBAR
════════════════════════════════════════ */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('Home')
  const [scrollPct, setScrollPct] = useState(0)
  const magnetic = useMagnetic(0.3)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const doc = document.documentElement
      setScrollPct((window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 3rem', height: 68,
          background: scrolled
            ? 'rgba(5,8,14,0.94)'
            : 'rgba(5,8,14,0.55)',
          backdropFilter: 'blur(24px) saturate(200%)',
          borderBottom: `1px solid ${scrolled ? 'rgba(0,229,160,0.12)' : 'rgba(255,255,255,0.05)'}`,
          transition: 'background 0.5s, border-color 0.5s',
        }}
      >
        {/* Scroll progress bar */}
        <motion.div
          style={{
            position: 'absolute', bottom: -1, left: 0, height: 1.5,
            background: `linear-gradient(90deg, ${S.accent}, #6d28d9)`,
            width: `${scrollPct}%`,
            boxShadow: `0 0 10px ${S.accent}`,
            borderRadius: '0 2px 2px 0',
          }}
        />

        {/* ── Logo ── */}
        <motion.a
          href="#"
          style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}
          whileTap={{ scale: 0.96 }}
        >
          {/* Animated logo mark */}
          <div style={{ position: 'relative' }}>
            <motion.div
              style={{
                width: 38, height: 38, borderRadius: 10,
                background: `linear-gradient(135deg, ${S.accent} 0%, #00b87a 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 13, color: '#020d07',
                letterSpacing: '-0.02em',
              }}
              whileHover={{
                borderRadius: '50%',
                boxShadow: `0 0 0 4px rgba(0,229,160,0.15), 0 0 32px rgba(0,229,160,0.4)`,
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              HS
            </motion.div>
            {/* Online dot */}
            <motion.div
              style={{
                position: 'absolute', top: -2, right: -2,
                width: 9, height: 9, borderRadius: '50%',
                background: S.accent,
                border: '1.5px solid #05080e',
                boxShadow: `0 0 8px ${S.accent}`,
              }}
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <motion.span
              style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 700,
                fontSize: 15, color: '#eef2ff', letterSpacing: '-0.01em',
                lineHeight: 1,
              }}
              whileHover={{ color: S.accent }}
              transition={{ duration: 0.2 }}
            >
              Hasnain Saeed
            </motion.span>
            <span style={{
              fontFamily: 'IBM Plex Mono, monospace', fontSize: 12,
              color: S.accent, letterSpacing: '0.14em', opacity: 0.8,
            }}>
              AI ENGINEER/Developer
            </span>
          </div>
        </motion.a>

        {/* ── Desktop Links ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          {NAV_LINKS.map((link, i) => (
            <NavLink key={link} link={link} active={active} onClick={setActive} index={i} />
          ))}
        </div>

        {/* ── Mobile hamburger ── */}
        <motion.button
          onClick={() => setMobileOpen(o => !o)}
          style={{
            display: 'none', // show via CSS media query if needed
            flexDirection: 'column', gap: 5, background: 'transparent',
            border: 'none', cursor: 'pointer', padding: 8,
          }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{
                rotate: mobileOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                y: mobileOpen ? (i === 0 ? 9 : i === 2 ? -9 : 0) : 0,
                opacity: mobileOpen && i === 1 ? 0 : 1,
                width: i === 1 ? (mobileOpen ? 20 : 14) : 20,
              }}
              style={{ width: i === 1 ? 14 : 20, height: 1.5, background: S.accent, borderRadius: 2, transformOrigin: 'center' }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.button>
      </motion.nav>

      <MobileMenu
        open={mobileOpen}
        links={NAV_LINKS}
        active={active}
        onSelect={(l) => { setActive(l); setMobileOpen(false) }}
        accent={S.accent}
      />
    </>
  )
}