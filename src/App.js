import React, { Component } from 'react'
import orderBy from 'lodash/orderBy'
import List from './List'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    let itemsPromise = fetch('http://localhost:3333/items/').then(item => item.json())

    this.state = {items: [], ordering: 'asc'}

    itemsPromise.then((items) => {
      this.setState({
        items: orderBy(items, 'seconds', this.state.ordering)
      })
    })

    this.switchOrdering = this.switchOrdering.bind(this)
  }

  selectItem = (item) => {
    this.setState({
      selectedItem: item
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
      <div className="App">
        <div className="App-header">
          <h2>Listings</h2>
        </div>
        <div className="App-list">
          <div className="List-wrapper">
            <div className="List-half">
              <button onClick={this.switchOrdering}>Reverse order</button>
              <List selectItem={this.selectItem} items={this.state.items} />
            </div>
            <div className="List-half">
              <div className="Selected-item">
                {this.state.selectedItem ? this.state.selectedItem.item.location.address.streetAddress : 'Lorem ipsum'}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
