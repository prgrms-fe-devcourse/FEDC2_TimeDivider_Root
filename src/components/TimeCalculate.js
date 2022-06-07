import { useTimer } from 'react-timer-hook'
import { useRecoilState } from 'recoil'
import { currentTimerState, timerState } from '../atom'
import { useEffect } from 'react'

function TimeCalculate({ expiryTimestamp, autoStart = false, id, name }) {
	const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
		expiryTimestamp,
		onExpire: () => console.warn('onExpire called'),
		autoStart,
	})
	const [timers, setTimers] = useRecoilState(timerState)
	const [currentTimer, setCurrentTimer] = useRecoilState(currentTimerState)

	useEffect(() => {
		setTimers({ ...timers, [id]: hours * 60 * 60 + minutes * 60 + seconds })
	}, [seconds])

	useEffect(() => {
		if (currentTimer.id !== id) pause()
	}, [currentTimer])

	return (
		<div style={{ textAlign: 'center' }}>
			<h1>{name} </h1>
			<div style={{ fontSize: '100px' }}>
				<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
			</div>
			<p>{isRunning ? '진행중' : '정지됨'}</p>
			<button
				onClick={() => {
					resume()
					setCurrentTimer({ id, name })
				}}
			>
				시작
			</button>
			<button onClick={pause}>일시정지</button>
		</div>
	)
}

export default TimeCalculate
