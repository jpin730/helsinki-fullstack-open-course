import StatisticLine from './StatisticLine'

const Statistics = ({ good, neutral, bad }) => {
  const feedbackCount = good + neutral + bad
  const average = feedbackCount === 0 ? 0 : (good - bad) / feedbackCount
  const positiveFeedbackPercentage = feedbackCount === 0 ? 0 : (good / feedbackCount) * 100

  return (
    <>
      <h2>Statistics</h2>
      {feedbackCount > 0 ? (
        <>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={feedbackCount} />
          <StatisticLine text="Average" value={average.toFixed(2)} />
          <StatisticLine
            text="Positive feedback"
            value={`${positiveFeedbackPercentage.toFixed(2)}%`}
          />
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  )
}

export default Statistics
