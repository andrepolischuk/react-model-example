import fetch from 'isomorphic-fetch'

export default async function api (endpoint) {
  const response = await fetch(`https://api.github.com/${endpoint}`)
  const json = await response.json()

  if (json.error) {
    throw new Error(json.error)
  }

  return json
}
