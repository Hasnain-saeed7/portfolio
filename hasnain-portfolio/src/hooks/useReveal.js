import { useRef } from 'react'
import { useInView } from 'framer-motion'

export function useReveal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return [ref, inView]
}