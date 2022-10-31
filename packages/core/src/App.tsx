import { App } from '@lowcode/concept'
import Page from './pages/Layout/Page'
import { useState } from 'react'
import Transition from './components/Animation/Transition'

function Root() {
  const app = new App({})
  const [show, setShow] = useState(false)

  return (
    <>
      <Transition state={show} start="backInUp" end="backOutDown">
        <div>123123</div>
      </Transition>
      <button onClick={() => setShow(!show)}>切换</button>
      <Page />
    </>
  )
}

export default Root
