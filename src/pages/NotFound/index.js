import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from 'shared/components'

const NotFound = () => {
	return (
		<>
			<ErrorSection>
				<h2>
					<span>
						<h2> 🚨 Not Found 🚨 </h2>
					</span>
				</h2>
				<Link to="">
					<Button>일 모래시계 만들기</Button>
				</Link>
			</ErrorSection>
		</>
	)
}

export default NotFound

export const ErrorSection = styled.section`
	background-color: rgba(0, 0, 0, 0.9);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;

	h2 {
		font-size: 3rem;
		color: #fff;
		margin-bottom: 1.2rem;
		-webkit-box-reflect: below -42px linear-gradient(transparent, #0004);
	}

	h2 span {
		animation: animate 5s linear infinite;
	}

	h2 span:nth-child(even) {
		animation-delay: 0.4s;
	}

	@keyframes animate {
		0%,
		18%,
		20%,
		50.1%,
		60%,
		65.1%,
		80%,
		90.1%,
		92% {
			color: #0e3742;
			text-shadow: none;
		}

		18.1%,
		20.1%,
		30%,
		50%,
		60.1%,
		65%,
		80.1%,
		90%,
		92.1%,
		100% {
			color: #fff;
			text-shadow: 0 0 10px red, 0 0 20px red, 0 0 40px red, 0 0 80px red, 0 0 160px red,
				0 0 400px red;
		}
	}
`
