import TimeCalculate from './components/TimeCalculate'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { currentTimerState, timerState } from './atom'
import { useEffect, useState } from 'react'

function App() {
	const dummyTime = new Date()
	dummyTime.setSeconds(dummyTime.getSeconds() + 600)

	const [timers] = useRecoilState(timerState)
	const [currentTimer] = useRecoilState(currentTimerState)
	const [totalTime, setTotalTime] = useState(0)
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		setTotalTime(Object.values(timers).reduce((acc, curr) => acc + curr, 0))
	}, [timers])

	return (
		<div className="App">
			남은 전체 시간: {formattedTime(totalTime).hours} 시간 {formattedTime(totalTime).minutes} 분{' '}
			{formattedTime(totalTime).seconds} 초<div> 현재 하는 일: {currentTimer.name}</div>
			<form
				onSubmit={e => {
					e.preventDefault()
					setTasks([
						...tasks,
						{
							name: e.target.task.value,
							time: e.target.hour.value * 60 * 60 + e.target.minute.value * 60,
						},
					])
				}}
			>
				할 일: <input name={'task'} required={true} type={'text'} maxLength={10} />
				몇 시간 : <input name={'hour'} required={true} type={'number'} maxLength={2} max={23} />
				몇 분: <input name={'minute'} required={true} type={'number'} maxLength={2} max={59} />
				<button>생성하기</button>
			</form>
			<TimeCalculate expiryTimestamp={dummyTime} autoStart={false} id={'first'} name={'코딩하기'} />
			{tasks.map(({ name, time }, index) => {
				const tempTime = new Date()
				tempTime.setSeconds(tempTime.getSeconds() + time)
				return <TimeCalculate key={index} expiryTimestamp={tempTime} id={index} name={name} />
			})}
		</div>
	)
}

const formattedTime = totalTime => {
	return {
		hours: Math.floor(totalTime / 3600),
		minutes: Math.floor((totalTime % 3600) / 60),
		seconds: (totalTime % 3600) % 60,
	}
}
export default App
