import React, { Component } from 'react'

import { metersToKilometers, secondsToMinutes } from './utils'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import './SelectedItem.css'

class SelectedItem extends Component {
  render() {
    let item = this.props.item
    if(!item) { return null }

    let position = [
      item.item.location.position.latitude,
      item.item.location.position.longitude,
    ]

    return (
      <div className="List-item">
          <button onClick={() => this.props.toggleInterest(item)}>{item.interested ? 'Interested' : 'Not interested'}</button>
          <span className="List-kmFromWork">{metersToKilometers(item.meters)} km</span>
          <span className="List-minutesToWork">{secondsToMinutes(item.seconds)} min</span>
          <span className="List-namedArea">{item.item.location.namedAreas[0]}</span>
          <span className="List-streetAddress">{item.item.location.address.streetAddress}</span>


      <Map className="SelectedItem-Map" center={position} zoom={14}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
          </Popup>
        </Marker>
      </Map>

      </div>
    )
  }
}

export default SelectedItem
