import {useState} from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Anecdote = ({title, selected, votes}) => (
  <>
    <h1>{title}</h1>
    <p>{selected}</p>
    <p>Has {votes} votes</p>
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(10).fill(0))

  const voteForCurrent = () => {
    const copyOfVotes = [...votes]
    copyOfVotes[selected] = votes[selected] + 1
    setVotes(copyOfVotes)
  }

  const random = (max) => Math.floor(Math.random() * max)

  const getNextRandom = () => {
    const current = selected
    const max = anecdotes.length

    let newRandom
    do {
      newRandom = random(max)
    } while (current === newRandom)

    setSelected(newRandom)
  }

  const getSelected = () => anecdotes[selected]
  const getVotes = () => votes[selected]

  const getTopVotes = () => Math.max(...votes)
  const getTop = () => {
    const max = getTopVotes()
    const index = votes.indexOf(max)
    return anecdotes[index]
  }

  return (
    <div>
      <Anecdote title='Anecdote of the day' selected={getSelected()} votes={getVotes()}/>

      <Button text='next anecdote' handleClick={getNextRandom}/>
      <Button text='vote' handleClick={voteForCurrent}/>

      <Anecdote title='Anecdote with most votes' selected={getTop()} votes={getTopVotes()}/>
    </div>
  )
}

export default App