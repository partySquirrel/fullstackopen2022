const PersonForm = ({onSubmit, onNameChange, newName, onNumberChange, newNumber}) => (
  <form onSubmit={onSubmit}>
    <div>
      <label>
        Name: <input type="text" value={newName} onChange={onNameChange}/>
      </label>
    </div>
    <div>
      <label>
        Number: <input type="text" value={newNumber} onChange={onNumberChange}/>
      </label>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm