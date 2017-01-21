import React, { Component } from 'react'
import './ListItem.css'

class ListItem extends Component {
  metersToKilometers(meters) {
    return Math.round(meters/1000)
  }
  secondsToMinutes(seconds) {
    return Math.round(seconds/60)
  }

  render() {
    let item = this.props.item
    return (
      <div className="List-item">
            <span className="List-kmFromWork">{this.metersToKilometers(item.meters)} km</span>
            <span className="List-minutesToWork">{this.secondsToMinutes(item.seconds)} min</span>
            <span className="List-namedArea">{item.item.location.namedAreas[0]}</span>
            <span className="List-streetAddress">{item.item.location.address.streetAddress}</span>
      </div>
    )
  }
}

export default ListItem
