import {useState} from 'react'

const Header = ({text}) => <h1>{text}</h1>

const StatisticLine = ({text, value}) => <tr>
  <td>{text}</td>
  <td>{value}</td>
</tr>

const Statistics = ({good, neutral, bad}) => {
  // yhteenlasketun määrän
  const total = () => good + neutral + bad

  // keskiarvon (hyvän arvo 1, neutraalin 0, huonon -1)
  const average = () => {
    if (total() === 0) return 0

    return (good - bad) / total()
  }

  // kuinka monta prosenttia palautteista on ollut positiivisia
  const positive = () => {
    if (total() === 0 || good === 0) return '0%'
    return `${good / total() * 100}%`
  }

  if (total() === 0) {
    return (
      <div>
        <Header text='Statistics'/>
        <p>No feedback given :(</p>
      </div>
    )
  }

  return (
    <div>
      <Header text='Statistics'/>
      <table>
        <tbody>
        <StatisticLine value={good} text='good'/>
        <StatisticLine value={neutral} text='neutral'/>
        <StatisticLine value={bad} text='bad'/>

        <StatisticLine value={total()} text='all'/>
        <StatisticLine value={average()} text='average'/>
        <StatisticLine value={positive()} text='positive'/>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Header text='Give Feedback'/>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>

      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App