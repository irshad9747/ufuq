import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return ref
}

export function useRevealMultiple(count) {
  const refs = useRef([])
  const observerRef = useRef(null)
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observerRef.current?.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe existing refs
    refs.current.forEach(ref => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref)
      }
    })

    return () => {
      refs.current.forEach(ref => {
        if (ref && observerRef.current) {
          observerRef.current.unobserve(ref)
        }
      })
      observerRef.current?.disconnect()
    }
  }, [])

  const setRef = (index) => (el) => {
    if (el) {
      // Unobserve old ref if it exists
      const oldRef = refs.current[index]
      if (oldRef && observerRef.current) {
        observerRef.current.unobserve(oldRef)
      }
      
      refs.current[index] = el
      
      // Observe new ref
      if (observerRef.current) {
        observerRef.current.observe(el)
      }
    }
  }

  return setRef
}

