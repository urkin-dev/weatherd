import { ReactNode } from 'react'
import { styled } from '@linaria/react'
import { theme } from '@lib/theme'

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
	width: 30%;
	padding: 45px 35px;
`

const StyledRight = styled.div`
	padding: 45px 35px;
	background-color: ${theme.color.backgray};
	width: 100%;
`
