import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedbackCount = good + neutral + bad
  const average = feedbackCount === 0 ? 0 : (good - bad) / feedbackCount
  const positiveFeedbackPercentage = feedbackCount === 0 ? 0 : (good / feedbackCount) * 100

  return (
    <main>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <hr />
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {feedbackCount}</p>
      <p>Average: {average.toFixed(2)}</p>
      <p>Positive feedback: {positiveFeedbackPercentage.toFixed(2)}%</p>
    </main>
  )
}

export default App
