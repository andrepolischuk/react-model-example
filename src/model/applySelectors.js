import merge from './merge'

export default function applySelectors (selectors) {
  return createModel => (...args) => {
    const model = createModel(...args)

    return Object
      .entries(selectors)
      .reduce((acc, [key, selector]) => merge(acc, {
        get [key] () {
          return selector(model.state)
        }
      }), model)
  }
}
