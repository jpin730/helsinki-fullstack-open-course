import { useState } from 'react'
import Statistics from './components/Statistics.jsx'
import Button from './components/Button.jsx'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <main>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />
      <hr />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </main>
  )
}

export default App
