import React, { Component } from 'react'
import moment from 'moment';

import { secondsToMinutes, moneyFormat, formatDate } from './utils'

import './ListItem.css'

class ListItem extends Component {
  render() {
    let item = this.props.item
    let published = moment(item.item.published)
    let today = moment()
    let days = today.diff(published, 'days');
    return (
        <a className="List-item" onClick={(e) => { e.preventDefault(); this.props.selectItem(item) }} href="">
          <table>
            <tbody>
              <tr>
                <td className="List-askingPrice" width="19%">{moneyFormat(item.item.listPrice)} kr</td>
                <td className="List-kmFromWork" width="8%">{days}d</td>
                <td className="List-minutesToWork" width="12%">{secondsToMinutes(item.seconds)} min</td>
                <td className="List-kvm" width="12%">{item.item.livingArea}kvm</td>
                <td className="List-namedArea" width="49%">{item.item.location.namedAreas[0]}</td>
              </tr>
            </tbody>
          </table>
          {item.showings.map((show, i) => {
            return (
              <span key={i}>
                {formatDate(show)}
              </span> 
            )
          })}
        </a>
    )
  }
}

export default ListItem
