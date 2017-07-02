import React, { Component } from 'react'
import orderBy from 'lodash/orderBy'
import axios from 'axios';
import List from './List'
import SelectedItem from './SelectedItem'
import './App.css'
import './react-datetime.css'

class App extends Component {
  constructor(props) {
    super(props)


    this.state = {items: [], ordering: 'asc'}

    this.switchOrdering = this.switchOrdering.bind(this)
  }

  async componentDidMount() {
    let items = await axios.get('http://localhost:3333/items/')

    const orderedItems = orderBy(items.data, 'seconds', this.state.ordering)

    this.setState({
      items: orderedItems,
      hideNonInterested: true,
    }, () => {
      this.setState({
        selectedItem: this.filteredItems()[0],
      })
    })
  }

  toggleInterest = (item) => {
      const id = item._id;
      axios.put(`http://localhost:3333/items/toggleInterest/?id=${id}`).then(() => {
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

  toggleNonInterested = () => {
    this.setState((prevState) => {
      return {
        hideNonInterested: !prevState.hideNonInterested,
      }
    })
  }

  switchOrdering() {
    this.setState((prevState) => {
      const newOrder = prevState.ordering === 'asc' ? 'desc' : 'asc'
      return {
        ordering: newOrder,
      }
    })
  }

  filteredItems() {
    let items = this.state.items
    if(this.state.hideNonInterested) {
      items = items.filter((item) => item.interested)
    }
    
    items = orderBy(items, (item) => {
      let strength = -1;
      if(item.showings.length > 0) {
        strength = -10000;
      }
      return (item.seconds/item.item.listPrice) * strength;
    }, this.state.ordering);

    return items
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Appartments</h2>
        </div>
        <div className="App-list">
        <div className="Filters">
            <button onClick={this.switchOrdering}>Reverse order</button>
            <button onClick={this.toggleNonInterested}>{this.state.hideNonInterested ? 'Show non interested' : 'Hide non interested' }</button>
        </div>
          <div className="List-wrapper">
            <div className="List-half">
              <List selectItem={this.selectItem} items={this.filteredItems()} />
            </div>
            <div className="List-half">
              <div className="Selected-item">
                <SelectedItem selectItem={this.selectItem} toggleInterest={this.toggleInterest} item={this.state.selectedItem} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
