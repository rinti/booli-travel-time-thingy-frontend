import React, { Component } from 'react'
import './List.css'
import ListItem from './ListItem'

class List extends Component {
  render() {
    return (
      <div>
        <div className="List">
          {this.props.items.map((item) => {
            return <ListItem item={item} key={item._id.toString()} />
          })}
        </div>
      </div>
    )
  }
}

export default List;
