import { useEffect } from 'react'

export function useAnimeAnimations() {
  useEffect(() => {
    // Force focus on the document window
    if (window.focus) window.focus()
    if (document.body && document.body.focus) document.body.focus()
  }, [])
}
