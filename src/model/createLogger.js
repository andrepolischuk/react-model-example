export default function createLogger (modelName = '!@#$%') {
  return () => next => update => {
    const nextState = next(update)

    console.log(`%c---> ${modelName} :: ${update.__internal}`, 'font-weight: bold')
    console.log('···· next update...', {...update})
    console.log('···· next state....', {...nextState})

    return nextState
  }
}
