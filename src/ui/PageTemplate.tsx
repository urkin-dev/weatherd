import { ReactNode } from 'react'
import { styled } from '@linaria/react'

interface IProps {
	left: ReactNode
	right: ReactNode
}

export default function PageTemplate({ left, right }: IProps) {
	return (
		<Container>
			<StyledLeft>{left}</StyledLeft>
			<StyledRight>{right}</StyledRight>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	width: 100%;
	min-height: 100vh;
`

const StyledLeft = styled.div`
	max-width: 30%;
	padding: 45px 35px;
`

const StyledRight = styled.div`
	padding: 45px 35px;
`
