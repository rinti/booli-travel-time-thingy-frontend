import React, { Component } from 'react'
import './List.css'
import ListItem from './ListItem'
import orderBy from 'lodash/orderBy'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {items: [], ordering: 'asc'}

    this.switchOrdering = this.switchOrdering.bind(this)
  }

  componentDidMount() {
    let itemsPromise = fetch('http://localhost:3333/items/').then(item => item.json())

    itemsPromise.then((items) => {
      this.setState({
        items: orderBy(items, 'seconds', this.state.ordering)
      })
    })
  }

  switchOrdering() {
    this.setState((prevState) => {
      const newOrder = prevState.ordering === 'asc' ? 'desc' : 'asc'
      return {
        ordering: newOrder,
        items: orderBy(prevState.items, 'seconds', newOrder)
      }
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.switchOrdering}>Reverse order</button>
        <div className="List">
          {this.state.items.map((item) => {
            return <ListItem item={item} key={item._id.toString()} />
          })}
        </div>
      </div>
    )
  }
}

export default List;
