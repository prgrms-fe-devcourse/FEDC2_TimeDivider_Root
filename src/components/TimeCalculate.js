import { useTimer } from 'react-timer-hook'
import { useRecoilState, useRecoilValue } from 'recoil'
import { combineState, currentTimerState, nameState, timeState } from '../atom'
import { useEffect, useState } from 'react'
import { formattedTime } from '../App'

function TimeCalculate({ expiryTimestamp, autoStart = false, id, name }) {
	const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
		expiryTimestamp,
		onExpire: () => console.warn('onExpire called'),
		autoStart,
	})

	const [times, setTimes] = useRecoilState(timeState)
	const [names, setNames] = useRecoilState(nameState)
	const [combine, setCombine] = useRecoilState(combineState)
	const [currentTimer, setCurrentTimer] = useRecoilState(currentTimerState)

	useEffect(() => {
		setTimes({ ...times, [id]: hours * 60 * 60 + minutes * 60 + seconds })
	}, [hours, minutes, seconds])

	useEffect(() => {
		if (currentTimer.id !== id) pause()
	}, [currentTimer])

	useEffect(() => {
		if (combine.id === id) restart(combine.newExpiryTimestamp, false)
	}, [combine])

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
			<form
				onSubmit={e => {
					e.preventDefault()
					const selectedId = e.target.selectedId.value
					const newExpiryTimestamp = new Date(
						new Date().getTime() + times[id] * 1000 + times[selectedId] * 1000,
					)
					const newTimes = Object.assign({}, times)
					const newNames = Object.assign({}, names)
					delete newTimes[id]
					delete newNames[id]

					setTimes(newTimes)
					setNames(newNames)
					//예상되는 문제 : 합쳐진 시간이 24시간이 넘어가는 경우, 하지만 전체시간을 24시간으로 제한 할 것이기 때문에 발생하지 않음
					setCombine({ id: selectedId, newExpiryTimestamp })
				}}
			>
				<select name={'selectedId'}>
					{Object.entries(names).map(
						([optionId, optionName]) =>
							optionId !== id && <option value={optionId}>{optionName}</option>,
					)}
				</select>
				에<button>시간합치기</button>
			</form>
		</div>
	)
}

export default TimeCalculate
