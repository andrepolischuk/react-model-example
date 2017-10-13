export default function merge (target, ...sources) {
  for (let source of sources) {
    for (let key of Object.keys(source)) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
    }
  }

  return target
}
