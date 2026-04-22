import { useRef } from 'react'
import { motion, useInView, useSpring } from 'framer-motion'
import { SKILLS } from '../constants'
import { S, fadeUp, stagger } from '../constants/styles'
import { useReveal } from '../hooks/useReveal'
import { Section, SectionHeader } from './Section'
import { useState } from 'react'

function SkillBar({ name, pct }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, cursor: 'default' }}
    >
      <motion.span
        animate={{ color: hovered ? S.accent : '#f0f4ff' }}
        transition={{ duration: 0.25 }}
        style={{ fontFamily: 'seraphine', fontSize: 20, fontWeight: 500, minWidth: 150 }}
      >
        {name}
      </motion.span>

      <motion.div
        animate={{ height: hovered ? 10 : 5 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ flex: 1, background: S.card2, borderRadius: 3, overflow: 'hidden' }}
      >
        <motion.div
          animate={{
            width: inView ? `${pct}%` : '0%',
            boxShadow: hovered
              ? '0 0 18px rgba(0,229,160,0.7), 0 0 36px rgba(0,229,160,0.3)'
              : '0 0 8px rgba(0,229,160,0.4)',
          }}
          transition={{
            width: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 },
            boxShadow: { duration: 0.3 },
          }}
          style={{ height: '100%', borderRadius: 3, background: S.accent }}
        />
      </motion.div>

      <motion.span
        animate={{ color: hovered ? S.accent : S.muted }}
        transition={{ duration: 0.25 }}
        style={{ fontSize: 12, minWidth: 34, textAlign: 'right' }}
      >
        {pct}%
      </motion.span>
    </div>
  )
} 




/* ─── TECH EXPERTISE ─── */
export default function TechExpertise() {
  const [ref, inView] = useReveal()
  return (
    <Section id="about" alt>
      <SectionHeader badge="Technical Expertise" title="Skills & Technologies" sub="A full-stack toolkit built for modern AI-powered products" />
      <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '2rem 3rem' }}>
        {SKILLS.map((group, i) => (
          <motion.div key={i} variants={fadeUp}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: S.accent, textTransform: 'uppercase', marginBottom: 20, paddingBottom: 10, borderBottom: `1px solid ${S.border}` }}>
              {group.category}
            </div>
            {group.items.map((item, j) => <SkillBar key={j} {...item} />)}
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

















