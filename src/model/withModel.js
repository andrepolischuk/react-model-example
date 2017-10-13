import React, {Component} from 'react'
import {object} from 'prop-types'
import observe from './observe'

function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function withModel (modelName) {
  return WrappedComponent => class WithModel extends Component {
    static displayName = `WithModel(${getDisplayName(WrappedComponent)})`

    static contextTypes = {
      models: object
    }

    model = this.context.models[modelName]

    componentDidMount () {
      this.cancel = observe(this.model, () => {
        this.forceUpdate()
      })
    }

    componentWillUnmount () {
      this.cancel()
    }

    render () {
      return (
        <WrappedComponent {...this.props} {...this.model} />
      )
    }
  }
}
