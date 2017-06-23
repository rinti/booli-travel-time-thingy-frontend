import React, { Component } from 'react'

import { metersToKilometers, secondsToMinutes, moneyFormat } from './utils'

import './ListItem.css'

class ListItem extends Component {
  render() {
    let item = this.props.item
    return (
        <a className="List-item" onClick={() => this.props.selectItem(item)} href="#">
        <table>
            <tr>
              <td className="List-askingPrice" width="19%">{moneyFormat(item.item.listPrice)} kr</td>
              <td className="List-kmFromWork" width="12%">{metersToKilometers(item.meters)} km</td>
              <td className="List-minutesToWork" width="12%">{secondsToMinutes(item.seconds)} min</td>
              <td className="List-kvm" width="12%">{item.item.livingArea}kvm</td>
              <td className="List-namedArea" width="45%">{item.item.location.namedAreas[0]}</td>
            </tr>
        </table>
        </a>
    )
  }
}

export default ListItem
