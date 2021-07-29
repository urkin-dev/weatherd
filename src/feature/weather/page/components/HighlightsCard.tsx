import { theme } from '@lib/theme'
import { styled } from '@linaria/react'
import { ReactNode } from 'react'

interface IProps {
	title?: string
	mainValue?: number
	valuePrefix?: string
	status?: string
	className?: string
	children?: ReactNode
}

export default function HighlightsCard({ title, mainValue, valuePrefix, status, className, children }: IProps) {
	return (
		<CardContainer>
			<CardTitle>{title}</CardTitle>
			<ValueContainer>
				<MainValue>{mainValue}</MainValue>
				<ValuePrefix>{valuePrefix}</ValuePrefix>
			</ValueContainer>
			<Status>{status}</Status>
			{children}
		</CardContainer>
	)
}

const CardContainer = styled.div`
	background-color: ${theme.color.white};
	border-radius: 15px;
	min-width: 240px;
	display: flex;
	flex-direction: column;
	padding: 15px 25px;
	justify-content: space-between;
	height: 200px;
	margin-bottom: 20px;
`
const CardTitle = styled.p`
	padding: 0;
	color: ${theme.color.lightgray};
	font-size: ${theme.font.size.main}px;
`

const MainValue = styled.p`
	padding: 0;
	line-height: 1;
	font-size: ${theme.font.size.large}px;
	margin-right: 5px;
	color: ${theme.color.black};
	font-size: ${theme.font.size.huge}px;
`

const ValuePrefix = styled.p`
	padding: 0;
	font-size: ${theme.font.size.medium}px;
	color: ${theme.color.black};
`

const ValueContainer = styled.div`
	display: flex;
	align-items: flex-end;
	color: ${theme.color.black};
`

const Status = styled.p`
	padding: 0;
	color: ${theme.color.blue};
`
