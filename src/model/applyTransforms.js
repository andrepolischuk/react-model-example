import merge from './merge'
import compose from './compose'

export default function applyTransforms (...transforms) {
  return createModel => (...args) => {
    const model = createModel(...args)
    const chain = transforms.map(tf => tf(model))
    const commit = compose(...chain)(model.commit)
    const nextModel = merge(model, {commit})

    Object.defineProperty(nextModel, 'commit', {
      enumerable: false
    })

    return nextModel
  }
}
