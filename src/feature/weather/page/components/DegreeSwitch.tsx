import { theme } from '@lib/theme'
import { styled } from '@linaria/react'
import React from 'react'

interface IProps {
	active: 'F' | 'C'
	onClick: (measurement: string) => void
}

export default function DegreeSwitch({ active, onClick }: IProps) {
	// TODO: add state
	const onSwitch = (e: React.MouseEvent<HTMLButtonElement>) => {
		const measurement = e.currentTarget.value
		onClick(measurement)
	}

	return (
		<Container>
			<SwitchButton onClick={onSwitch} data-active={active === 'C' ? 'active' : 'inactive'} value="C">
				&#176;C
			</SwitchButton>
			<SwitchButton onClick={onSwitch} data-active={active === 'F' ? 'active' : 'inactive'} value="F">
				&#176;F
			</SwitchButton>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: right;
`

const SwitchButton = styled.button`
	padding: 5px;
	border: none;
	outline: none;
	cursor: pointer;
	background-color: ${theme.color.white};
	color: ${theme.color.black};
	border-radius: 50%;
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 10px;

	:last-of-type {
		margin-right: 0;
	}

	&[data-active='active'] {
		color: ${theme.color.white};
		background-color: ${theme.color.button};
	}
`
