import compose from './model/compose'
import createLogger from './model/createLogger'
import {createModel, applyEffects, applyTransforms} from './model'

export default compose(
  applyEffects({
    signOn () {
      return {
        sid: 1
      }
    },

    signOut () {
      return {
        sid: null
      }
    }
  }),
  applyTransforms(
    createLogger('session')
  )
)(createModel)
