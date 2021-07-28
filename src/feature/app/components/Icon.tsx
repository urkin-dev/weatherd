import { ReactComponent as D1 } from '@assets/weather/01d.svg'
import { ReactComponent as D2 } from '@assets/weather/02d.svg'
import { ReactComponent as D3 } from '@assets/weather/03d.svg'
import { ReactComponent as D4 } from '@assets/weather/04d.svg'
import { ReactComponent as D9 } from '@assets/weather/09d.svg'
import { ReactComponent as D10 } from '@assets/weather/10d.svg'
import { ReactComponent as D11 } from '@assets/weather/11d.svg'
import { ReactComponent as D13 } from '@assets/weather/13d.svg'
import { ReactComponent as D50 } from '@assets/weather/50d.svg'

import { ReactComponent as N1 } from '@assets/weather/01n.svg'
import { ReactComponent as N2 } from '@assets/weather/02n.svg'
import { ReactComponent as N3 } from '@assets/weather/03d.svg'
import { ReactComponent as N10 } from '@assets/weather/10n.svg'

const ICONS = {
	'01d': <D1 width="100%" height="100%" />,
	'02d': <D2 width="100%" height="100%" />,
	'03d': <D3 width="100%" height="100%" />,
	'04d': <D4 width="100%" height="100%" />,
	'09d': <D9 width="100%" height="100%" />,
	'10d': <D10 width="100%" height="100%" />,
	'11d': <D11 width="100%" height="100%" />,
	'13d': <D13 width="100%" height="100%" />,
	'50d': <D50 width="100%" height="100%" />,
	'01n': <N1 width="100%" height="100%" />,
	'02n': <N2 width="100%" height="100%" />,
	'03n': <N3 width="100%" height="100%" />,
	'04n': <D4 width="100%" height="100%" />,
	'09n': <D9 width="100%" height="100%" />,
	'10n': <N10 width="100%" height="100%" />,
	'11n': <D11 width="100%" height="100%" />,
	'13n': <D13 width="100%" height="100%" />,
	'50n': <D50 width="100%" height="100%" />
}

export type IconType = keyof typeof ICONS

interface IProps {
	name: IconType
}

const Icon = ({ name }: IProps) => {
	return <>{ICONS[name]}</>
}

export default Icon
