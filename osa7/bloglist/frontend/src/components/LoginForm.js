import { useField } from '../hooks'
import { login } from '../reducers/userReducer'
import { connect } from 'react-redux'

const LoginForm = (props) => {
  const username = useField('username')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    props.login(username.value, password.value)
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...username} />
      </div>
      <div>
        password
        <input {...password} />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  login,
}

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default ConnectedForm
