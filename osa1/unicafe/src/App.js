import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>
const Stats = ({text, value}) => <p>{text}: {value}</p>

const Button = ({ handleClick, text }) => (
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
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />

      <Header text='Statistics'/>
      <Stats value={good} text='good' />
      <Stats value={neutral} text='neutral' />
      <Stats value={bad} text='bad' />
    </div>
  )
}

export default App