import { motion } from 'framer-motion'
import { S, fadeUp, stagger } from '../constants/styles'
import { useReveal } from '../hooks/useReveal'

/* ─── SECTION WRAPPER ─── */
export function Section({ id, alt, children, style = {} }) {
  return (
    <section id={id} style={{ position: 'relative', zIndex: 1, padding: '6rem 3.5rem', background: alt ? S.bg2 : 'transparent', ...style }}>
      {children}
    </section>
  )
}

/* ─── SECTION HEADER ─── */
export function SectionHeader({ badge, title, sub }) {
  const [ref, inView] = useReveal()
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
      style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
      <motion.span variants={fadeUp} style={{
        display: 'inline-block', background: S.accentDim, color: S.accent,
        border: `1px solid ${S.accentBorder}`, borderRadius: 99,
        padding: '5px 18px', fontSize: 13, fontWeight: 800,
        letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '1.2rem',
      }}>{badge}</motion.span>
      <motion.h2 variants={fadeUp} style={{ fontFamily: 'Times New Roman', fontSize: 50, fontWeight: 900, marginBottom: 18 }}>{title}</motion.h2>
      <motion.p variants={fadeUp} style={{ fontSize: 17, color: S.muted, maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>{sub}</motion.p>
    </motion.div>
  )
} 


