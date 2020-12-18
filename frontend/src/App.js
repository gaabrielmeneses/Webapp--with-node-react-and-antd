import React from 'react'
import { 
	Layout, 
	Menu
} from 'antd'
import Listagem from './components/Listagem'

const { Header, Content, Footer } = Layout

function App() {
	return (
		<Layout className="layout">
			<Header>
				<div className="logo" />
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} />
			</Header>
			<Content style={{ padding: '0 50px' }}>
				<div
					style={{
						marginTop: 32
					}}
				>
					<Listagem />
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
		</Layout>
	)
}

export default App
