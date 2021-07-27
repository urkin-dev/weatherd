import { styled } from '@linaria/react'
import Search from './Search'

export default function Sidebar() {
	return (
		<SidebarContainer>
			<Search />
		</SidebarContainer>
	)
}

const SidebarContainer = styled.div`
	display: flex;
	flex-direction: column;
`
