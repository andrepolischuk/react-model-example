import React from 'react'
import {render} from 'react-dom'
import {Provider} from './model'
import createUsers from './users'
import createSession from './session'
import App from './App'

const users = createUsers({
  error: null,
  fetching: false,
  users: []
})

const session = createSession({
  sid: null
})

render(
  <Provider users={users} session={session}>
    <App />
  </Provider>,
  document.getElementById('root')
)
