import React, { Component } from 'react'
import axios from 'axios'
import Datetime from 'react-datetime'
import moment from 'moment'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import './SelectedItem.css'

class SelectedItem extends Component {

  addShowing = () => {
    const id = this.props.item._id
    console.log(this.refs.show.state.selectedDate.format('YYYY-MM-DD HH:mm'))
    axios.post(`http://localhost:3333/updateShowing/`, {
      id,
      date: this.refs.show.state.selectedDate.format('YYYY-MM-DD HH:mm')
    }).then((data) => {
      this.refs.show.value = '';
      this.props.selectItem(data.data);
    }).catch((err) => {
      this.refs.show.value = '';
    })
  }

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

        {item.showings && item.showings.map((show, i) => {
          return (
            <span className="showing-date" key={i}>
              {moment(show).format('DD/MM HH:ss')}
            </span>
          )
        })}

        <Datetime ref="show" dateFormat="YYYY-MM-DD" timeFormat="HH:mm" /> <button onClick={this.addShowing}>Add showing</button>

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
