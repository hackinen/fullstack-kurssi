import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return (
    <div>{text} {value}</div>
  )
}

const Statistics = ({good,neutral,bad}) => {
  if (good+neutral+bad <= 0) {
    return (
      <div>no feedback given</div>
    )
  }

  return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good+neutral+bad} />
      <StatisticLine text="average" value={(good-bad)/(good+neutral+bad)} />
      <StatisticLine text="positive" value={good/(good+neutral+bad) + " %"} />
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const pressGood = () => {
    setGood(good+1)
  }
  const pressNeutral = () => {
    setNeutral(neutral+1)
  }
  const pressBad = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>

      <div>
        <Button onClick={pressGood} text="good" />
        <Button onClick={pressNeutral} text="neutral" />
        <Button onClick={pressBad} text="bad" />
      </div>

      <div>
        <h1>statistics</h1>
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
