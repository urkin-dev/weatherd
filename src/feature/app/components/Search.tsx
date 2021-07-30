import { theme } from '@lib/theme'
import { styled } from '@linaria/react'
import { Input } from 'antd'
import { ReactComponent as Loupe } from '@assets/loupe.svg'
import { ReactComponent as Location } from '@assets/location.svg'
import { KeyboardEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@lib/hooks'
import { getCityByCoords, getCoords, getWeather, ICoords, setError, setLoading, updateCity } from '@feature/weather'

export default function Search() {
	const dispatch = useAppDispatch()
	const weatherStore = useAppSelector((state) => state.weather)
	let coords: ICoords

	const makeApiCall = async (city: string | null, coords?: ICoords) => {
		if (city?.trim() === '') return

		try {
			if (city) {
				await dispatch(getCoords(city))
			} else if (coords) {
				await dispatch(getCityByCoords(coords))
			}

			await dispatch(getWeather()).unwrap()

			// If the city is correct
			dispatch(updateCity())
		} catch (e) {
			console.error(e)
		}
	}

	const getLocation = async () => {
		if (!navigator.geolocation) {
			dispatch(setError({ name: 'Error', message: 'Geolocation is not supported by your browser' }))
		} else {
			dispatch(setLoading('loading'))
			navigator.geolocation.getCurrentPosition(
				(position) => {
					coords = { lat: position.coords.latitude, lon: position.coords.longitude }
					makeApiCall(null, coords)
				},
				() => {
					dispatch(setError({ name: 'Error', message: 'Unable to retrieve your location' }))
					dispatch(setLoading('failed'))
				}
			)
		}
	}

	const onSearch = async (e: KeyboardEvent<HTMLInputElement>) => {
		const city = e.currentTarget.value

		await makeApiCall(city)
	}

	return (
		<>
			{weatherStore.error?.message && <ErrorMessage>{weatherStore.error.message}</ErrorMessage>}
			<StyledInput
				placeholder="Search for places..."
				prefix={<SearchIcon />}
				onPressEnter={onSearch}
				suffix={
					<LocationButton onClick={getLocation}>
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
