import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { S } from '../constants/styles'
import { NAV_LINKS } from '../constants'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      position: 'relative', 
      zIndex: 1, 
      borderTop: `1px solid ${S.border}`, 
      backgroundColor: S.bg2,
      padding: '5rem 2rem 2rem'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '3rem',
        marginBottom: '4rem'
      }}>
        {/* Brand Section */}
        <div>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: 40, height: 40, borderRadius: 10,
                background: S.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 14, color: '#030b07',
              }}
            >HS</div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 18, color: '#f0f4ff' }}>
              Hasnain Saeed
            </span>
          </a>
          <p style={{ color: S.muted, fontSize: '0.95rem', lineHeight: 1.6, maxWidth: 300 }}>
            Full Stack AI Engineer building intelligent systems and scalable web platforms with passion &amp; precision.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#f0f4ff', fontSize: '1.1rem', marginBottom: '1.5rem', fontFamily: 'Syne, sans-serif' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {NAV_LINKS.map(link => (
              <li key={link}>
                <motion.a 
                  href={`#${link.toLowerCase()}`}
                  style={{ color: S.muted, textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s', display: 'inline-block' }}
                  whileHover={{ color: S.accent, x: 2 }}
                >
                  {link}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact/Socials */}
        <div>
          <h4 style={{ color: '#f0f4ff', fontSize: '1.1rem', marginBottom: '1.5rem', fontFamily: 'Syne, sans-serif' }}>Connect</h4>
          <div style={{ display: 'flex', gap: '1rem' }}>
 

            {[
              { Icon: Github, href: 'https://github.com/Hasnain-saeed7' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/hasnainsykh' },   
              { Icon: Mail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=hasnainqureshi2232@gmail.com' },
            ].map((social, i) => (
              <motion.a 
                key={i} 
                href={social.href} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  color: S.muted, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: S.card2,
                  border: `1px solid ${S.border}`,
                  transition: 'border-color 0.2s, color 0.2s'
                }}
                whileHover={{ 
                  borderColor: S.accent, 
                  color: S.accent, 
                  y: -3 
                }}
              >
                <social.Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        paddingTop: '2rem', 
        borderTop: `1px solid ${S.border}`, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.85rem', 
        color: S.muted 
      }}>
        <span>© {currentYear} Hasnain Saeed. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <motion.a whileHover={{ color: '#fff' }} href="#" style={{ color: S.muted, textDecoration: 'none', transition: 'color 0.2s' }}>Privacy Policy</motion.a>
          <motion.a whileHover={{ color: '#fff' }} href="#" style={{ color: S.muted, textDecoration: 'none', transition: 'color 0.2s' }}>Terms of Service</motion.a>
        </div>
      </div>
    </footer>
  )
} 