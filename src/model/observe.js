export default function observe (model, observer) {
  if (typeof observer !== 'function') {
    throw new TypeError('Expected observer to be a function')
  }

  model.observers.push(observer)

  return function cancel () {
    const index = model.observers.indexOf(observer)

    if (index < 0) {
      return
    }

    model.observers.splice(index, 1)
  }
}
