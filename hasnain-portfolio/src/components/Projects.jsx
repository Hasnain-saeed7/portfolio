
import { motion } from 'framer-motion'
import { ArrowRight, Github, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { PROJECTS } from '../constants'
import { S } from '../constants/styles'
import { Section, SectionHeader } from './Section'

// ─── tunables ────────────────────────────────────────────────────────────────
const CARD_W   = 320
const CARD_H   = 480
const RADIUS_X = 520   // horizontal spread
const RADIUS_Z = 260   // depth
// ─────────────────────────────────────────────────────────────────────────────

function getCardTransform(index, total, activeIndex) {
  const angleStep = (2 * Math.PI) / total
  const angle     = (index - activeIndex) * angleStep

  const x         = Math.sin(angle) * RADIUS_X
  const z         = Math.cos(angle) * RADIUS_Z - RADIUS_Z
  const rotateY   = -angle * (180 / Math.PI)
  const proximity = Math.cos(angle)   // 1 = directly in front, -1 = behind

  // hide cards that face away from viewer
  const isVisible = proximity > -0.15

  const brightness = isVisible ? Math.max(0.38, 0.38 + 0.62 * proximity) : 0
  const scale      = isVisible ? Math.max(0.68, 0.68 + 0.32 * proximity) : 0.65
  const blur       = isVisible ? Math.max(0, (1 - proximity) * 3.5) : 5

  return { x, z, rotateY, scale, brightness, blur, isVisible, proximity }
}

function ProjectCard({ proj, transform, isActive, onClick }) {
  const { x, z, rotateY, scale, brightness, blur, isVisible } = transform
  const glow = proj.color ?? '#00e5a0'

  if (!isVisible) return null

  return (
    <motion.div
      onClick={isActive ? undefined : onClick}
      animate={{
        x,
        scale,
        rotateY,
        filter: `brightness(${brightness}) blur(${blur}px)`,
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 30 }}
      style={{
        position: 'absolute',
        width: CARD_W,
        cursor: isActive ? 'default' : 'pointer',
        transformStyle: 'preserve-3d',
        zIndex: isActive ? 10 : Math.round(transform.proximity * 5 + 5),
        translateZ: z,
        userSelect: 'none',
      }}
    >
      {/* glow halo behind active card */}
      {isActive && (
        <div style={{
          position: 'absolute', inset: -48, borderRadius: 40,
          background: `radial-gradient(ellipse at 50% 58%, ${glow}38 0%, transparent 68%)`,
          pointerEvents: 'none', zIndex: -1,
        }} />
      )}

      <motion.div
        whileHover={isActive ? { y: -7 } : {}}
        transition={{ duration: 0.25 }}
        style={{
          borderRadius: 24, overflow: 'hidden',
          background: isActive
            ? `linear-gradient(155deg, #0d1f15 0%, #081410 100%)`
            : `linear-gradient(155deg, #0c180f 0%, #070e0a 100%)`,
          border: `1.5px solid ${isActive ? glow + '55' : 'rgba(255,255,255,0.07)'}`,
          boxShadow: isActive
            ? `0 32px 80px rgba(0,0,0,0.75), 0 0 60px ${glow}22`
            : '0 16px 40px rgba(0,0,0,0.5)',
          padding: '1.8rem',
          display: 'flex', flexDirection: 'column', gap: '0.9rem',
          minHeight: CARD_H,
          position: 'relative',
        }}
      >
        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {proj.tags.slice(0, 4).map((t, i) => (
            <span key={i} style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '1.5px',
              textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6,
              background: i === 0 ? glow + '20' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${i === 0 ? glow + '50' : 'rgba(255,255,255,0.08)'}`,
              color: i === 0 ? glow : 'rgba(255,255,255,0.4)',
            }}>{t}</span>
          ))}
        </div>

        {/* Icon */}
        <div style={{
          width: 58, height: 58, borderRadius: 16, fontSize: 28,
          background: glow + '18', border: `1.5px solid ${glow}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 20px ${glow}22`,
        }}>{proj.icon}</div>

        {/* Text */}
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', color: glow, textTransform: 'uppercase', marginBottom: 5 }}>
            {proj.category}
          </p>
          <h3 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: isActive ? '2rem' : '1.55rem',
            fontWeight: 800, color: '#fff', marginBottom: 5, lineHeight: 1.15,
          }}>{proj.name}</h3>
          <p style={{ fontSize: 13, fontWeight: 600, color: glow, marginBottom: 10 }}>{proj.tagline}</p>
          <p style={{
            fontSize: 13, color: 'rgba(255,255,255,0.42)', lineHeight: 1.75,
            display: '-webkit-box', WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{proj.desc}</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
          {proj.stats.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 10, padding: '10px 6px', textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 800, color: glow }}>{s.val}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.32)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <motion.a href={proj.liveLink} target='_blank'
            whileHover={{ scale: 1.05, boxShadow: `0 0 28px ${glow}55` }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: glow, color: '#030b07',
              padding: '11px 20px', borderRadius: 10,
              fontWeight: 700, fontSize: 13, textDecoration: 'none',
            }}>
            Live Demo <ArrowRight size={14} />
          </motion.a>
          <motion.a href={proj.githubLink} target='_blank'
            whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.96 }}
            style={{
              width: 42, height: 42, borderRadius: 10,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
            }}>
            <Github size={16} />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const total = PROJECTS.length
  const [active, setActive] = useState(0)
  const isDragging  = useRef(false)
  const dragStartX  = useRef(0)
  const dragDelta   = useRef(0)

  const prev = () => setActive(a => (a - 1 + total) % total)
  const next = () => setActive(a => (a + 1) % total)

  // keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const onPointerDown = (e) => {
    isDragging.current  = true
    dragStartX.current  = e.clientX
    dragDelta.current   = 0
  }
  const onPointerMove = (e) => {
    if (!isDragging.current) return
    dragDelta.current = e.clientX - dragStartX.current
  }
  const onPointerUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    if      (dragDelta.current >  65) prev()
    else if (dragDelta.current < -65) next()
  }

  return (
    <Section id="projects">
      <SectionHeader
        badge="Work"
        title={<>Dynamic <span style={{ color: '#00e5a0', fontStyle: 'italic' }}>Projects</span> Showcase</>}
        sub="An immersive 3D experience exploring my latest work in AI and software engineering"
      />

      {/* ── 3-D Stage ── */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{
          position: 'relative',
          height: CARD_H + 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: 1400,
          perspectiveOrigin: '50% 45%',
          marginTop: '3rem',
          cursor: 'grab',
          touchAction: 'none',
          overflow: 'hidden',
        }}
      >
        {PROJECTS.map((proj, i) => {
          const transform = getCardTransform(i, total, active)
          return (
            <ProjectCard
              key={proj.name}
              proj={proj}
              transform={transform}
              isActive={i === active}
              onClick={() => setActive(i)}
            />
          )
        })}
      </div>

      {/* ── Controls ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: '1.5rem' }}>
        <motion.button onClick={prev}
          whileHover={{ scale: 1.12, borderColor: '#00e5a0', color: '#00e5a0' }}
          whileTap={{ scale: 0.92 }}
          style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(255,255,255,0.04)',
            border: '1.5px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'border-color 0.2s, color 0.2s',
          }}>
          <ChevronLeft size={20} />
        </motion.button>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {PROJECTS.map((_, i) => (
            <motion.button key={i} onClick={() => setActive(i)}
              animate={{
                width: i === active ? 26 : 8,
                background: i === active ? '#00e5a0' : 'rgba(255,255,255,0.18)',
              }}
              transition={{ duration: 0.3 }}
              style={{ height: 8, borderRadius: 4, border: 'none', cursor: 'pointer', padding: 0 }}
            />
          ))}
        </div>

        <motion.button onClick={next}
          whileHover={{ scale: 1.12, borderColor: '#00e5a0', color: '#00e5a0' }}
          whileTap={{ scale: 0.92 }}
          style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(255,255,255,0.04)',
            border: '1.5px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'border-color 0.2s, color 0.2s',
          }}>
          <ChevronRight size={20} />
        </motion.button>
      </div>

      <p style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: 'rgba(255,255,255,0.22)', letterSpacing: '1px' }}>
       
      </p>
    </Section>
  )
}

















