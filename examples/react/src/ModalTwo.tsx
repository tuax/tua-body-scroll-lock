import { useEffect, useRef } from 'react'
import { lock, unlock } from 'tua-body-scroll-lock'

export function ModalTwo (props: {
  onClose: () => void
}) {
  const targetThree = useRef<HTMLDivElement>(null)

  useEffect(() => {
    lock(targetThree.current!, { useGlobalLockState: true })
    return () => {
      unlock(targetThree.current!, { useGlobalLockState: true })
    }
  }, [])

  return (
    <dialog id="modalTwo" className="modal" onClick={props.onClose}>
      <h2>dialog two with scroll-x</h2>
      <div id="targetThree" ref={targetThree} className="target" onClick={e => e.stopPropagation()}>
        <p>123456789101112131415161718192021222324252627282930</p>
        { Array(50).fill(0).map((_, i) => <p key={i}>{i} scroll me~</p>) }
      </div>
    </dialog>
  )
}
