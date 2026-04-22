import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { CAPABILITIES } from '../constants'
import { S, fadeUp, stagger } from '../constants/styles'
import { useReveal } from '../hooks/useReveal'
import { Section, SectionHeader } from './Section'

export default function Capabilities() {
  const [ref, inView] = useReveal()
  const [hoveredIndex, setHoveredIndex] = useState(null)
  
  return (
    <Section id="services" alt>
      <SectionHeader badge="Core Capabilities" title="What I Build" sub="Premium AI-powered systems engineered for real-world business impact" />
      <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 30 }}>
        {CAPABILITIES.map((cap, i) => (
          <motion.div key={i} variants={fadeUp}
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(0,0,0,0.4)', borderColor: 'rgba(0,229,160,0.25)' }}
            style={{
              background: hoveredIndex === i ? 'linear-gradient(160deg,#0c1f18,#0c1220)' : S.card,
              border: hoveredIndex === i ? `1.5px solid ${S.accentBorder}` : `1px solid ${S.border}`,
              boxShadow: hoveredIndex === i ? '0 0 40px rgba(0,229,160,0.08)' : 'none',
              borderRadius: 18, padding: '2rem 1.8rem',
              transition: 'all 0.3s ease',
            }}>
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.4 }}
              style={{
                width: 54, height: 54, borderRadius: 14,
                background: S.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.4rem',
              }}>
              <cap.icon size={26} color="#030b07" strokeWidth={2} />
            </motion.div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{cap.title}</h3>
            <p style={{ fontSize: 14, color: S.muted, lineHeight: 1.7 }}>{cap.desc}</p>
            {hoveredIndex === i && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 18 }}
                whileHover={{ x: 4 }} 
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', alignItems: 'center', gap: 5, color: S.accent, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Learn more <ArrowRight size={14} />
              </motion.div>
            )}
          </motion.div> 
        ))}
      </motion.div>
    </Section> 
  )
}
 