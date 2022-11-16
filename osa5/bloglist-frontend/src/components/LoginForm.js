const LoginForm = ({ onSubmit, onUsernameChange, username, onPasswordChange, password }) => (
  <form onSubmit={onSubmit}>
    <div>
      <label>
        Username: <input type="text" key="username" name="username" value={username} onChange={onUsernameChange}/>
      </label>
    </div>
    <div>
      <label>
        Password: <input type="text" key="password" name="password" value={password} onChange={onPasswordChange}/>
      </label>
    </div>
    <div>
      <button type="submit">Login</button>
    </div>
  </form>
)

export default LoginForm