import { useEffect, useRef } from 'react'
import { lock, unlock } from 'tua-body-scroll-lock'

export function ModalOne (props: {
  onClose: () => void
  onClickBtn: () => void
}) {
  const targetOneRef = useRef<HTMLDivElement>(null)
  const targetTwoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    lock(
      [targetOneRef.current!, targetTwoRef.current!],
      { overflowType: 'clip', useGlobalLockState: true },
    )
    return () => {
      unlock(
        [targetOneRef.current!, targetTwoRef.current!],
        { useGlobalLockState: true },
      )
    }
  }, [])

  return (
    <div id="modalOne" className="modal" onClick={props.onClose}>
      <h2>
        dialog one
        <button onClick={e => {
          props.onClickBtn()
          e.stopPropagation()
        }}>
          click me to show dialog two
        </button>
      </h2>

      <div id="targetOne" ref={targetOneRef} className="target" onClick={e => e.stopPropagation()}>
        { Array(50).fill(0).map((_, i) => <p key={i}>{i} scroll me~</p>) }
      </div>

      <div id="targetTwo" ref={targetTwoRef} className="target" onClick={e => e.stopPropagation()}>
        { Array(50).fill(0).map((_, i) => <p key={i}>{i} scroll me~</p>) }
      </div>
    </div>
  )
}
