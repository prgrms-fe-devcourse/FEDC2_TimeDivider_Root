import TimeCalculate from './components/TimeCalculate'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { currentTimerState, nameState, taskState, timeState } from './atom'
import { useEffect, useState } from 'react'

function App() {
	const dummyTime = new Date()
	dummyTime.setSeconds(dummyTime.getSeconds() + 600)

	const [times, setTimes] = useRecoilState(timeState)
	const [names, setNames] = useRecoilState(nameState)
	const [currentTimer] = useRecoilState(currentTimerState)

	const [totalTime, setTotalTime] = useState(0)

	useEffect(() => {
		setTotalTime(Object.values(times).reduce((acc, curr) => acc + curr, 0))
	}, [times])

	return (
		<div className="App">
			남은 전체 시간: {formattedTime(totalTime).hours} 시간 {formattedTime(totalTime).minutes} 분{' '}
			{formattedTime(totalTime).seconds} 초<div> 현재 하는 일: {currentTimer.name}</div>
			<form
				onSubmit={e => {
					e.preventDefault()
					const [name, time, id] = [
						e.target.task.value,
						e.target.hour.value * 60 * 60 + e.target.minute.value * 60,
						'' + Date.now(),
					]
					setTimes({ ...times, [id]: time })
					setNames({ ...names, [id]: name })
				}}
			>
				할 일: <input name={'task'} required={true} type={'text'} maxLength={10} />
				몇 시간 : <input name={'hour'} required={true} type={'number'} maxLength={2} max={23} />
				몇 분: <input name={'minute'} required={true} type={'number'} maxLength={2} max={59} />
				<button>생성하기</button>
			</form>
			{Object.entries(names).map(([id, name]) => {
				//리팩토링 필요: names 와 times 종속됨
				const expiryTime = new Date(new Date().getTime() + times[id] * 1000)
				return <TimeCalculate key={id} expiryTimestamp={expiryTime} id={id} name={name} />
			})}
		</div>
	)
}

export const formattedTime = totalTime => {
	return {
		hours: Math.floor(totalTime / 3600),
		minutes: Math.floor((totalTime % 3600) / 60),
		seconds: (totalTime % 3600) % 60,
	}
}
export default App
