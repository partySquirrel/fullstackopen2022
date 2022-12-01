import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const changeFilter = (event) => {
    const content = event.target.value
    dispatch(setFilter(content))
  }

  return (
    <div>filter <input name="filter" onChange={changeFilter}/></div>
  )
}

export default Filter