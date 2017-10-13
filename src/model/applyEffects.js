import merge from './merge'

export default function applyEffects (effects) {
  return createModel => (...args) => {
    const model = createModel(...args)

    return Object
      .entries(effects)
      .reduce((acc, [key, effect]) => merge(acc, {
        [key] (...args) {
          return model.effect(effect, ...args)
        }
      }), model)
  }
}
