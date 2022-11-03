import { App } from '@lowcode/concept'
import Page from './pages/Layout/Page'
import Toolbar from './pages/Toolbar/Toolbar'

import { Layout } from 'antd'

const { Header } = Layout
function Root() {
  const app = new App({})

  return (
    <Layout>
      <Header>
        <Toolbar />
      </Header>
      <Page />
    </Layout>
  )
}

export default Root
