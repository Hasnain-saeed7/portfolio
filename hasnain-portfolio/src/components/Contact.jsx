import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import { S, fadeUp, stagger } from '../constants/styles'
import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  const [ref, inView] = useReveal()
  const contacts = [
    { 
    icon: Mail, 
    label: 'Email', 
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=hasnainqureshi2232@gmail.com' 
  }, 
    { icon: Github, label: 'GitHub', href: 'https://github.com/Hasnain-saeed7' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/hasnainsykh' },
  ]
  return (
    <section id="contact" style={{ position: 'relative', zIndex: 1, padding: '6rem 3.5rem', background: `linear-gradient(180deg, ${S.bg2}, ${S.bg})`, textAlign: 'center' }}>
      <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>
        <motion.span variants={fadeUp} style={{
          display: 'inline-block', background: S.accentDim, color: S.accent,
          border: `1px solid ${S.accentBorder}`, borderRadius: 99,
          padding: '5px 18px', fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '1.2rem',
        }}>Contact</motion.span>

        <motion.h2 variants={fadeUp} style={{ fontFamily: 'seraphine', fontSize:  60 ,  fontWeight: 800, margin: '1rem 0 14px' }}>
          Let's Build Something
        </motion.h2>

        <motion.p variants={fadeUp} style={{ fontSize: 16, color: S.muted, marginBottom: '2.5rem', lineHeight: 1.7 }}>
          Have a project in mind? Let's connect and bring your ideas to life.
        </motion.p>

        <motion.div variants={stagger} style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {contacts.map(({ icon: Icon, label, href }, i) => (
            <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer" variants={fadeUp}
              whileHover={{ y: -6, borderColor: S.accentBorder, boxShadow: '0 12px 32px rgba(0,229,160,0.18)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 64, height: 64, borderRadius: 16,
                background: S.card, border: `1px solid ${S.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none', transition: 'border-color 0.25s',
              }}>
              <Icon size={28} color={S.accent} strokeWidth={1.5} />
            </motion.a>
          ))}
        </motion.div>

        <motion.button variants={fadeUp}
          whileHover={{ scale: 1.06, boxShadow: '0 0 36px rgba(0,229,160,0.45)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => window.open('https://www.linkedin.com/in/hasnainsykh', '_blank', 'noopener,noreferrer')}
          style={{
            background: S.accent, color: '#030b07',
            padding: '14px 36px', borderRadius: 11,
            fontFamily: 'DM Sans, sans-serif', fontSize: 16, fontWeight: 600,
            border: 'none', cursor: 'pointer',
            boxShadow: '0 0 24px rgba(0,229,160,0.25)',
          }}>
          Book a Consultation
        </motion.button>
      </motion.div>
    </section>
  )
}