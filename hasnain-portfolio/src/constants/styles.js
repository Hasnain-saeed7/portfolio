/* ─── STYLES ─── */
export const S = {
  accent: 'teal',
  accentDim: 'rgba(0,229,160,0.12)',
  accentBorder: 'rgba(0,229,160,0.25)',
  bg: '#06090f',
  bg2: '#080d18',
  card: '#0c1220',
  card2: '#101828',
  muted: '#8892a4',
  border: 'rgba(255,255,255,0.07)',
}

/* ─── ANIMATION VARIANTS ─── */
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
}