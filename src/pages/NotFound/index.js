import * as S from './style'

import { Link } from 'react-router-dom'
import Button from 'shared/components/Button'

const NotFound = () => {
	return (
		<>
			<S.ErrorSection>
				<h2>
					<span>
						<h2> 🚨 Not Found 🚨 </h2>
					</span>
				</h2>
				<Link to="home">
					<Button>일 모래시계 만들기</Button>
				</Link>
			</S.ErrorSection>
		</>
	)
}

export default NotFound
