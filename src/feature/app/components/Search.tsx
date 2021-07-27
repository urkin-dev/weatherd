import { theme } from '@lib/theme'
import { styled } from '@linaria/react'
import { Input } from 'antd'
import { ReactComponent as Loupe } from '@assets/loupe.svg'
import { ReactComponent as Location } from '@assets/location.svg'

export default function Search() {
	return (
		<StyledInput
			placeholder="Search for places..."
			prefix={<SearchIcon />}
			suffix={
				<LocationButton>
					<LocationIcon />
				</LocationButton>
			}
		/>
	)
}

const StyledInput = styled(Input)`
	color: ${theme.color.black};
	border: none;

	&.ant-input-affix-wrapper-focused {
		box-shadow: none;
	}

	.ant-input {
		font-size: ${theme.font.size.main}px;

		&::-webkit-input-placeholder {
			color: ${theme.color.black};
		}

		&::-ms-input-placeholder {
			color: ${theme.color.black};
		}

		&::placeholder {
			color: ${theme.color.black};
		}

		&:focus {
			outline: none;
			box-shadow: none;
		}
	}
`

const SearchIcon = styled(Loupe)`
	max-width: 14px;
	max-height: 14px;
	margin-right: 10px;
`

const LocationButton = styled.button`
	padding: 0;
	margin: 0;
	outline: none;
	border: none;
	background-color: ${theme.color.backgray};
	display: flex;
	justify-content: center;
	align-items: center;
	width: 35px;
	height: 35px;
	padding: 8px;
	border-radius: 50%;
	cursor: pointer;
`

const LocationIcon = styled(Location)`
	max-width: 100%;
	max-height: 100%;
`
