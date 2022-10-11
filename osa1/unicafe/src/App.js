import {useState} from 'react'

const Header = ({text}) => <h1>{text}</h1>
const Stats = ({text, value}) => <p>{text}: {value}</p>

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

  return (
    <div>
      <Header text='Statistics'/>

      <Stats value={good} text='good'/>
      <Stats value={neutral} text='neutral'/>
      <Stats value={bad} text='bad'/>

      <Stats value={total()} text='all'/>
      <Stats value={average()} text='average'/>
      <Stats value={positive()} text='positive'/>
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