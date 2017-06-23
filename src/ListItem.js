import React, { Component } from 'react'

import { metersToKilometers, secondsToMinutes } from './utils'

import './ListItem.css'

class ListItem extends Component {
  render() {
    let item = this.props.item
    return (
      <div className="List-item">
        <a onClick={() => this.props.selectItem(item)} href="#">
          <span className="List-kmFromWork">{metersToKilometers(item.meters)} km</span>
          <span className="List-minutesToWork">{secondsToMinutes(item.seconds)} min</span>
          <span className="List-namedArea">{item.item.location.namedAreas[0]}</span>
          <span className="List-streetAddress">{item.item.location.address.streetAddress}</span>
        </a>
      </div>
    )
  }
}

export default ListItem
