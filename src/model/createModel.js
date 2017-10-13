import merge from './merge'

export default function createModel (state = {}) {
  const getters = Object
    .keys(state)
    .reduce((acc, key) => merge(acc, {
      get [key] () {
        return state[key]
      }
    }), {})

  const internal = {
    get state () {
      return state
    },
    effect,
    commit,
    observers: []
  }

  const model = merge(getters, internal)

  function effect (effect, ...args) {
    const update = effect(state, ...args)

    Object.defineProperty(update, '__internal', {
      enumerable: false,
      value: effect.name
    })

    return model.commit(update)
  }

  function commit (update) {
    if (!update || state === update) {
      return
    }

    if (typeof update !== 'object') {
      throw new TypeError('Expected state update to be an object')
    }

    state = {
      ...state,
      ...update
    }

    for (let observer of model.observers) {
      observer({...model})
    }

    return state
  }

  for (let key of Object.keys(internal)) {
    Object.defineProperty(model, key, {
      enumerable: false
    })
  }

  return model
}
