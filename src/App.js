import React, {PureComponent} from 'react'
import compose from './model/compose'
import {withModel} from './model'
import api from './api'
import styles from './App.css'

class App extends PureComponent {
  componentWillReceiveProps ({users}) {
    if (users !== this.props.users) {
      this.input.value = ''
    }
  }

  async submit (login) {
    const {users, handleError, startFetching, addUser} = this.props

    if (!login) {
      return
    }

    const exists = users.find(user => user.login === login)

    if (exists) {
      handleError(`${login} already exists`)
    } else {
      startFetching()
      const user = await api(`users/${login}`)
      addUser(user)
    }
  }

  toggleSession = () => {
    const {sid, signOn, signOut} = this.props

    if (sid) {
      signOut()
    } else {
      signOn()
    }
  }

  render () {
    const {
      fetching,
      error,
      users,
      length,
      sid,
      handleError,
      deleteUser
    } = this.props

    return (
      <div className={fetching ? styles.fetching : styles.normal}>
        <p>
          {sid && 'Signed on'}
          <button
            type='button'
            onClick={() => this.toggleSession()}>
            {sid ? 'Sign Out' : 'Sign On'}
          </button>
        </p>
        <form onSubmit={event => {
          event.preventDefault()
          this.submit(this.input.value)
        }}>
          <input
            type='text'
            ref={el => {
              this.input = el
            }}
            placeholder='Type github username...'
            tabIndex='0'
            autoFocus />
          <button type='submit'>Add</button>
        </form>
        {error &&
          <p className={styles.error}>
            {error}
            {' '}
            <button
              type='button'
              onClick={() => handleError(null)}>
              Close
            </button>
          </p>
        }
        {users.map(user => (
          <p key={user.login}>
            <a href={user.url}>{user.name}</a>&nbsp;
            <small>{user.login}</small>&nbsp;
            <button onClick={() => deleteUser(user)}>
              Delete
            </button>
          </p>
        ))}
        <p>Users amount: {length}</p>
      </div>
    )
  }
}

export default compose(
  withModel('users'),
  withModel('session')
)(App)
