import { useState } from 'react'

import { HeaderPart } from './HeaderPart'
import { ModalOne } from './ModalOne'
import { ModalTwo } from './ModalTwo'

function App () {
  const [showModalOne, setShowModalOne] = useState(false)
  const [showModalTwo, setShowModalTwo] = useState(false)

  return (
    <>
      <HeaderPart/>

      <button id="btn" onClick={() => setShowModalOne(true)}>click me to <br />show dialog one</button>

      { showModalOne &&
        <ModalOne
          onClose={() => setShowModalOne(false)}
          onClickBtn={() => setShowModalTwo(true)}
        />
      }

      { showModalTwo && <ModalTwo onClose={() => setShowModalTwo(false)} /> }

      <div id="list">
        { Array(150).fill(0).map((_, i) => <p key={i}>{i} scroll me~</p>) }
      </div>
    </>
  )
}

export default App
