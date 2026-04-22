import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { S, fadeUp, stagger } from '../constants/styles'
import Typewriter from './Typewriter'

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 120])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section id="home" style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10rem 3.5rem 7rem', gap: '2rem' }}>
      {/* Left */}
      <motion.div style={{ maxWidth: '54%', y, opacity }} >
        <motion.p variants={fadeUp} initial="hidden" animate="show" style={{ fontSize: 27, color: S.muted, marginBottom: 10, letterSpacing: '0.5px' }}>
          Hi, I'm
        </motion.p>
        <motion.h1
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 'clamp(3rem, 5.5vw, 4.5rem)', lineHeight: 1.05, marginBottom: 18 }}
        >
          Hasnain Saeed
        </motion.h1>

        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }} style={{ marginBottom: 22 }}>
          <Typewriter />
        </motion.div>

        <motion.p variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}
          style={{ fontSize: 16, color: S.muted, lineHeight: 1.8, marginBottom: '2.8rem', maxWidth: 480 }}>
          Building <span style={{ color: S.accent, fontWeight: 600 }}>production-ready AI systems</span> —{' '}
          from <span style={{ color: S.accent, fontWeight: 600 }}>data pipelines</span> to{' '}
          <span style={{ color: S.accent, fontWeight: 600 }}>user interfaces</span>
        </motion.p>

        <motion.div variants={stagger} initial="hidden" animate="show" transition={{ delayChildren: 0.4 }}
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <motion.a href="#projects" variants={fadeUp}
            whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(0,229,160,0.45)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: S.accent, color: '#030b07',
              padding: '13px 26px', borderRadius: 10,
              fontWeight: 600, fontSize: 15, textDecoration: 'none',
              boxShadow: '0 0 24px rgba(0,229,160,0.3)',
            }}>
            View Projects <ArrowRight size={16} />
          </motion.a>
          <motion.a href="#contact" variants={fadeUp}
            whileHover={{ scale: 1.04, background: S.accentDim }}
            whileTap={{ scale: 0.97 }} 
             onClick={() => window.open('https://www.linkedin.com/in/hasnainsykh', '_blank', 'noopener,noreferrer')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'transparent', color: S.accent,
              padding: '13px 26px', borderRadius: 10,
              fontWeight: 600, fontSize: 15, textDecoration: 'none',
              border: `1.5px solid ${S.accentBorder}`,
            }}>
            Book a Consultation
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Right — Photo Ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ position: 'relative', flexShrink: 0 }}
      >
        {/* Spinning conic ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', inset: -4, borderRadius: '50%',
            background: 'conic-gradient(#00e5a0 0deg, transparent 120deg, #a855f7 200deg, transparent 280deg, #00e5a0 360deg)',
            zIndex: 0,
          }}
        />
        {/* Inner circle */}
        <div style={{
          position: 'relative', zIndex: 1,
          width: 360, height: 360, borderRadius: '50%',
          background: 'linear-gradient(135deg, #0c1220, #101828)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: 4, overflow: 'hidden',
        }}>
          {/* Replace this span with <img src="your-photo.jpg" style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
            <img src="portfolio.jpeg" alt="Hasnain Saeed" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          style={{
            position: 'absolute', bottom: -10, right: -24,
            background: S.card2, border: `1px solid ${S.border}`,
            borderRadius: 12, padding: '10px 16px',
            display: 'flex', alignItems: 'center', gap: 10,
            backdropFilter: 'blur(8px)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], scale: [1, 0.9, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 10, height: 10, borderRadius: '50%', background: S.accent, boxShadow: `0 0 8px ${S.accent}` }}
          />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Available for hire</span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: -80, left: '50%', transform: 'translateX(-50%)', opacity: 0.4 }}
        >
          <ChevronDown size={22} color={S.accent} />
        </motion.div>
      </motion.div>
    </section>
  )
}