import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const changeFilter = (event) => {
    const content = event.target.value
    props.setFilter(content)
  }
  return (
    <div>filter <input name="filter" onChange={changeFilter}/></div>
  )
}

const mapDispatchToProps = {
  setFilter,
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)