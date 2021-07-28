import { theme } from '@lib/theme'
import { styled } from '@linaria/react'
import { Input } from 'antd'
import { ReactComponent as Loupe } from '@assets/loupe.svg'
import { ReactComponent as Location } from '@assets/location.svg'
import { KeyboardEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@lib/hooks'
import { fetchForecast, getCoords, getCurrentWeather, updateCity } from '@feature/weather'

export default function Search() {
	const dispatch = useAppDispatch()
	const weatherStore = useAppSelector((state) => state.weather)

	const onSearch = async (e: KeyboardEvent<HTMLInputElement>) => {
		const city = e.currentTarget.value

		try {
			await dispatch(getCoords(city))
			await dispatch(getCurrentWeather()).unwrap()
			await dispatch(fetchForecast()).unwrap()

			// If the city is correct
			dispatch(updateCity())
		} catch (e) {
			console.log(e.message)
		}
	}

	const getRightErrorMessage = (text: string) => {
		const code = +text.substr(text.length - 3)

		if (code === 404) return 'The city not found'
		else return 'Something went wrong'
	}

	return (
		<>
			{weatherStore.error?.message && <ErrorMessage>{getRightErrorMessage(weatherStore.error.message)}</ErrorMessage>}
			<StyledInput
				placeholder="Search for places..."
				prefix={<SearchIcon />}
				onPressEnter={onSearch}
				suffix={
					<LocationButton>
						<LocationIcon />
					</LocationButton>
				}
			/>
		</>
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
const ErrorMessage = styled.p`
	padding: 0;
	color: ${theme.color.danger};
`
