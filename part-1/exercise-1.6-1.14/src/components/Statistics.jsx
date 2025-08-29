const Statistics = ({ good, neutral, bad }) => {
  const feedbackCount = good + neutral + bad
  const average = feedbackCount === 0 ? 0 : (good - bad) / feedbackCount
  const positiveFeedbackPercentage = feedbackCount === 0 ? 0 : (good / feedbackCount) * 100

  return (
    <>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {feedbackCount}</p>
      <p>Average: {average.toFixed(2)}</p>
      <p>Positive feedback: {positiveFeedbackPercentage.toFixed(2)}%</p>
    </>
  )
}

export default Statistics
