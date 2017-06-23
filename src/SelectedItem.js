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
      <div className="SelectedItem">
        <a href={`https://www.booli.se/redirect/all-images?id=${item.item.booliId}`}>Alla bilder</a> 
        <button onClick={() => this.props.toggleInterest(item)}>
          {!item.interested ? 'Interested' : 'Not interested'}
        </button>

        <Map className="SelectedItem-Map" center={position} zoom={14}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution=''
          />
          <Marker position={position}>
            <Popup>
              <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
            </Popup>
          </Marker>
        </Map>

        <span className="List-streetAddress">{item.item.location.address.streetAddress}</span>

      </div>
    )
  }
}

export default SelectedItem
