import React, { Component } from 'react'

import { metersToKilometers, secondsToMinutes, moneyFormat } from './utils'

import './ListItem.css'

class ListItem extends Component {
  render() {
    let item = this.props.item
    return (
        <a className="List-item" onClick={() => this.props.selectItem(item)} href="#">
          <span className="List-askingPrice">{moneyFormat(item.item.listPrice)} kr</span>
          <span className="List-kmFromWork">{metersToKilometers(item.meters)} km</span>
          <span className="List-minutesToWork">{secondsToMinutes(item.seconds)} min</span>
          <span className="List-namedArea">{item.item.location.namedAreas[0]}</span>
          <span className="List-streetAddress">{item.item.location.address.streetAddress}</span>
        </a>
    )
  }
}

export default ListItem
