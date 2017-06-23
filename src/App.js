import React, { Component } from 'react'
import orderBy from 'lodash/orderBy'
import List from './List'
import SelectedItem from './SelectedItem'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    let itemsPromise = fetch('http://localhost:3333/items/').then(item => item.json())

    this.state = {items: [], ordering: 'asc'}

    itemsPromise.then((items) => {
      const orderedItems = orderBy(items, 'seconds', this.state.ordering)
      this.setState({
        items: orderedItems,
        selectedItem: orderedItems[0],
      })
    })

    this.switchOrdering = this.switchOrdering.bind(this)
  }

  toggleInterest = (item) => {
      const id = item._id;
      fetch(`http://localhost:3333/items/toggleInterest/?id=${id}`,
      {method: 'PUT'}, () => {}).then(() => {
          let items = this.state.items;
          let selectedItem;

          for(var i in items) {
            if(items[i]._id === id) {
                items[i].interested = !items[i].interested
                selectedItem = items[i];
            }
          }

          this.setState({
            items,
            selectedItem,
          })
      })
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
                <SelectedItem toggleInterest={this.toggleInterest} item={this.state.selectedItem} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
