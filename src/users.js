import compose from './model/compose'
import createLogger from './model/createLogger'
import {createModel, applyEffects, applySelectors, applyTransforms} from './model'

export default compose(
  applyEffects({
    startFetching () {
      return {
        fetching: true
      }
    },

    addUser (state, user) {
      return {
        fetching: false,
        users: [
          ...state.users,
          user
        ]
      }
    },

    deleteUser (state, user) {
      return {
        users: state.users.filter(us => us !== user)
      }
    },

    handleError (state, error) {
      return {
        error
      }
    }
  }),
  applySelectors({
    length: state => state.users.length
  }),
  applyTransforms(
    createLogger('users')
  )
)(createModel)
