import { PageTemplate } from '@ui'
import Sidebar from './components/Sidebar'

function App() {
	return <PageTemplate left={<Sidebar />} right={<p>Content</p>} />
}

export default App
