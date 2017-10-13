import {Component, Children} from 'react'
import {object} from 'prop-types'

export default class Provider extends Component {
  static contextTypes = {
    models: object
  }

  static childContextTypes = {
    models: object
  }

  getChildContext () {
    const parentModels = this.context.models
    let models = {}

    if (parentModels) {
      for (let model in parentModels) {
        models[model] = parentModels[model]
      }
    }

    for (let key in this.props) {
      if (['children', 'key', 'ref'].indexOf(key) < 0) {
        models[key] = this.props[key]
      }
    }

    return {
      models
    }
  }

  render () {
    return Children.only(this.props.children)
  }
}

