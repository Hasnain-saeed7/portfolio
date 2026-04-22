import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ROLES } from '../constants'
import { S } from '../constants/styles'

export default function Typewriter() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIdx]
    let timeout
    if (!deleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75)
      } else {
        timeout = setTimeout(() => setDeleting(true), 2200)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38)
      } else {
        setDeleting(false)
        setRoleIdx(i => (i + 1) % ROLES.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIdx])

  return (
    <div style={{
      fontFamily: 'seraphine', fontWeight: 700,
      fontSize: 'clamp(1.8rem, 3.5vw, 2.7rem)',
      color: S.accent, minHeight: 56, lineHeight: 1.2,
      display: 'flex', alignItems: 'center', gap: 2,
    }}>
      <span>{displayed}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'steps(2)' }}
        style={{ display: 'inline-block', width: 3, height: '1em', background: S.accent, marginLeft: 2, borderRadius: 1 }}
      />
    </div>
  )
}