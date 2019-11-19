// jshint esversion:6
import React from 'react';
import GroceryListForm from './grocery-list-form.jsx';
import GroceryList from './grocery-list.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      groceryList: []
    };

    this.retrieveGroceryList = this.retrieveGroceryList.bind(this);
  }

  componentDidMount() {
    this.retrieveGroceryList();
  }

  retrieveGroceryList() {
    axios.get('http://localhost:3000/groceries')
      .then(results => this.setState({groceryList: results.data}))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='app'>
        <img src="grocery-bags.png"/>
        <h1>Grocery List</h1>
        <GroceryListForm getGroceries={this.retrieveGroceryList}/>
        <GroceryList getGroceries={this.retrieveGroceryList} list={this.state.groceryList}/>
      </div>
    );
  }
}

export default App;