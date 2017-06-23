import React, { Component } from 'react'

import { metersToKilometers, secondsToMinutes } from './utils'

import './SelectedItem.css'

class SelectedItem extends Component {
  render() {
    let item = this.props.item
    if(!item) { return null }

    return (
      <div className="List-item">
          <button onClick={() => this.props.toggleInterest(item)}>{item.interested ? 'Interested' : 'Not interested'}</button>
          <span className="List-kmFromWork">{metersToKilometers(item.meters)} km</span>
          <span className="List-minutesToWork">{secondsToMinutes(item.seconds)} min</span>
          <span className="List-namedArea">{item.item.location.namedAreas[0]}</span>
          <span className="List-streetAddress">{item.item.location.address.streetAddress}</span>
      </div>
    )
  }
}

export default SelectedItem
