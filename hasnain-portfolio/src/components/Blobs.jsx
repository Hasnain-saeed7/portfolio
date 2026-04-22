// import { motion } from 'framer-motion'

// export default function Blobs() {
//   return (
//     <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
//       {[
//         { w: 600, h: 600, bg: '#6d28d9', opacity: 0.18, top: -180, right: -150, dur: 20 },
//         { w: 450, h: 450, bg: '#1e3a8a', opacity: 0.22, bottom: '10%', left: -120, dur: 25 },
//         { w: 320, h: 320, bg: '#0f4c75', opacity: 0.14, top: '45%', right: '15%', dur: 22 },
//         { w: 220, h: 220, bg: '#00e5a0', opacity: 0.05, top: '20%', left: '30%', dur: 28 },
//       ].map((b, i) => (
//         <motion.div
//           key={i}
//           style={{
//             position: 'absolute', borderRadius: '50%',
//             width: b.w, height: b.h, background: b.bg, opacity: b.opacity,
//             filter: 'blur(100px)',
//             top: b.top, right: b.right, bottom: b.bottom, left: b.left,
//           }}
//           animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
//           transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: i * -6 }}
//         />
//       ))}
//     </div>
//   )
// }


















import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

/* ── Noise SVG filter injected once ── */
function NoiseFilter() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        <filter id="blob-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="overlay" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -8" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  )
}

/* ── Mouse-tracked aurora blob ── */
function AuroraBlob({ config, mouseX, mouseY }) {
  const x = useTransform(mouseX, [-1, 1], [config.parallaxX?.[0] ?? -30, config.parallaxX?.[1] ?? 30])
  const y = useTransform(mouseY, [-1, 1], [config.parallaxY?.[0] ?? -20, config.parallaxY?.[1] ?? 20])
  const springX = useSpring(x, { stiffness: 28, damping: 30 })
  const springY = useSpring(y, { stiffness: 28, damping: 30 })

  return (
    <motion.div
      style={{
        position: 'absolute',
        borderRadius: config.borderRadius ?? '60% 40% 55% 45% / 50% 60% 40% 50%',
        width: config.w,
        height: config.h,
        background: config.bg,
        opacity: config.opacity,
        filter: `blur(${config.blur ?? 90}px)`,
        top: config.top,
        right: config.right,
        bottom: config.bottom,
        left: config.left,
        x: springX,
        y: springY,
        mixBlendMode: config.blend ?? 'normal',
      }}
      animate={{
        borderRadius: [
          '60% 40% 55% 45% / 50% 60% 40% 50%',
          '45% 55% 40% 60% / 60% 40% 55% 45%',
          '55% 45% 60% 40% / 45% 55% 50% 50%',
          '60% 40% 55% 45% / 50% 60% 40% 50%',
        ],
        scale: config.scaleAnim ?? [1, 1.12, 0.95, 1],
        rotate: config.rotateAnim ?? [0, 8, -5, 0],
      }}
      transition={{
        duration: config.dur,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: config.delay ?? 0,
      }}
    />
  )
}

/* ── Orbiting particle ring ── */
function OrbitRing({ radius, count, color, duration, size = 3, opacity = 0.6 }) {
  return (
    <motion.div
      style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 2 * Math.PI
        const px = Math.cos(angle) * radius
        const py = Math.sin(angle) * radius
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              background: color,
              opacity: opacity * (0.4 + 0.6 * ((i % 3) / 3)),
              left: px,
              top: py,
              boxShadow: `0 0 ${size * 3}px ${color}`,
            }}
            animate={{ opacity: [opacity * 0.3, opacity, opacity * 0.3] }}
            transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.15 }}
          />
        )
      })}
    </motion.div>
  )
}

/* ── Shooting star ── */
function ShootingStar({ delay, top, left, angle = -35 }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top,
        left,
        width: 120,
        height: 1.5,
        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(180,255,230,0.9) 60%, rgba(255,255,255,0) 100%)',
        borderRadius: 2,
        rotate: angle,
        originX: 0,
      }}
      initial={{ scaleX: 0, opacity: 0, x: -60 }}
      animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 0.8, 0], x: [-60, 80] }}
      transition={{ duration: 1.1, delay, repeat: Infinity, repeatDelay: 6 + delay * 2, ease: 'easeOut' }}
    />
  )
}

/* ── Floating grid lines ── */
function GridLines() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `
        linear-gradient(rgba(0,229,160,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,229,160,0.03) 1px, transparent 1px)
      `,
      backgroundSize: '80px 80px',
      maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
    }} />
  )
}

/* ── Vignette edge darkener ── */
function Vignette() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(5,8,15,0.7) 100%)',
    }} />
  )
}

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
export default function Blobs() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      mouseX.set(nx)
      mouseY.set(ny)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  const blobs = [
    /* Primary violet crown — top right */
    {
      w: 700, h: 700,
      bg: 'radial-gradient(circle at 40% 40%, #7c3aed, #4f1fad 50%, transparent 80%)',
      opacity: 0.22, blur: 110,
      top: -220, right: -180,
      dur: 22, delay: 0,
      scaleAnim: [1, 1.15, 0.92, 1],
      rotateAnim: [0, 12, -6, 0],
      parallaxX: [-50, 50], parallaxY: [-30, 30],
      blend: 'screen',
    },
    /* Deep navy anchor — bottom left */
    {
      w: 550, h: 550,
      bg: 'radial-gradient(circle at 60% 60%, #1e40af, #0f2060 60%, transparent 85%)',
      opacity: 0.28, blur: 100,
      bottom: '5%', left: -140,
      dur: 28, delay: -8,
      scaleAnim: [1, 1.08, 1.04, 1],
      rotateAnim: [0, -10, 6, 0],
      parallaxX: [-20, 20], parallaxY: [-40, 40],
      blend: 'screen',
    },
    /* Teal accent spark — mid right */
    {
      w: 380, h: 380,
      bg: 'radial-gradient(circle at 50% 50%, #00e5a0, #009e6e 55%, transparent 80%)',
      opacity: 0.13, blur: 80,
      top: '38%', right: '8%',
      dur: 19, delay: -4,
      scaleAnim: [1, 1.2, 0.88, 1],
      rotateAnim: [0, 15, -8, 0],
      parallaxX: [-60, 60], parallaxY: [-25, 25],
      blend: 'screen',
    },
    /* Indigo mist — upper mid */
    {
      w: 300, h: 300,
      bg: 'radial-gradient(circle at 50% 50%, #6366f1, #4338ca)',
      opacity: 0.12, blur: 90,
      top: '15%', left: '25%',
      dur: 31, delay: -12,
      scaleAnim: [1, 1.1, 0.96, 1],
      rotateAnim: [0, -5, 10, 0],
      parallaxX: [-35, 35], parallaxY: [-50, 50],
      blend: 'screen',
    },
    /* Subtle cyan whisper — lower mid */
    {
      w: 260, h: 260,
      bg: 'radial-gradient(circle at 50% 50%, #06b6d4, #0e7490)',
      opacity: 0.09, blur: 70,
      bottom: '25%', right: '30%',
      dur: 24, delay: -16,
      scaleAnim: [1, 1.14, 0.9, 1],
      rotateAnim: [0, 20, -12, 0],
      parallaxX: [-45, 45], parallaxY: [-30, 30],
      blend: 'screen',
    },
    /* Micro magenta flare — top left */
    {
      w: 200, h: 200,
      bg: 'radial-gradient(circle at 50% 50%, #ec4899, #be185d)',
      opacity: 0.07, blur: 60,
      top: '8%', left: '5%',
      dur: 18, delay: -3,
      scaleAnim: [1, 1.25, 0.85, 1],
      rotateAnim: [0, -18, 9, 0],
      parallaxX: [-70, 70], parallaxY: [-40, 40],
      blend: 'screen',
    },
  ]

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      <NoiseFilter />
      <GridLines />

      {/* Blobs layer */}
      {blobs.map((b, i) => (
        <AuroraBlob key={i} config={b} mouseX={mouseX} mouseY={mouseY} />
      ))}

      {/* Orbiting particles */}
      <OrbitRing radius={220} count={12} color="#00e5a0" duration={18} size={2.5} opacity={0.5} />
      <OrbitRing radius={340} count={8}  color="#6d28d9" duration={28} size={1.5} opacity={0.35} />
      <OrbitRing radius={460} count={6}  color="#06b6d4" duration={40} size={2}   opacity={0.25} />

      {/* Shooting stars */}
      <ShootingStar delay={0}  top="18%"  left="10%" angle={-28} />
      <ShootingStar delay={3}  top="55%"  left="60%" angle={-42} />
      <ShootingStar delay={7}  top="30%"  left="75%" angle={-20} />
      <ShootingStar delay={11} top="72%"  left="20%" angle={-35} />

      <Vignette />
    </div>
  )
}