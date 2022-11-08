import { App } from '@lowcode/concept'
import Page from './pages/Layout/Page'
import Toolbar from './pages/Toolbar/Toolbar'

import SwitchTransition from './components/Animation/SwitchTransition'
import { Layout } from 'antd'
import { useState } from 'react'

const { Header } = Layout
function Root() {
  const app = new App({ name: 'app' })
  const [show, setShow] = useState(true)
  return (
    <Layout style={{ height: '100%' }}>
      <SwitchTransition state={show} start="bounceInRight">
        {show ? <div>123</div> : <div>456</div>}
      </SwitchTransition>
      <button onClick={() => setShow(!show)}>切换</button>
      <Header>
        <Toolbar />
      </Header>
      <Page />
    </Layout>
  )
}

export default Root
