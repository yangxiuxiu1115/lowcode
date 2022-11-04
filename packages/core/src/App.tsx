import { App } from '@lowcode/concept'
import Page from './pages/Layout/Page'
import Toolbar from './pages/Toolbar/Toolbar'

import { Layout } from 'antd'

const { Header } = Layout
function Root() {
  const app = new App({ name: 'app' })

  return (
    <Layout style={{ height: '100%' }}>
      <Header>
        <Toolbar />
      </Header>
      <Page />
    </Layout>
  )
}

export default Root
