// jshint esversion:6
import React from 'react';
import axios from 'axios';

class GroceryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      quantity: this.props.quantity
    };

    this.removeFromList = this.removeFromList.bind(this);
  }

  removeFromList(event) {
    axios.delete(`http://localhost:3000/groceries`, {
      params: {
        name: this.props.name
      }
    })
    .then(() => this.props.getGroceries())
    .catch(err => console.log(err));
  }

  decrement() {
    axios.put(`http://localhost:3000/groceries/${this.state.name}`, {
      quantity: this.state.quantity - 1
    }).then(() => this.props.getGroceries()).then(() => this.setState({quantity: this.state.quantity - 1})).then(() => {
      if (this.state.quantity < 1) {
        this.removeFromList();
      }
    }).catch(err => console.log(err));
  }

  increment() {
    axios.put(`http://localhost:3000/groceries/${this.state.name}`, {
      quantity: this.state.quantity + 1
    }).then(() => this.props.getGroceries()).then(() => this.setState({quantity: this.state.quantity + 1})).catch(err => console.log(err));
  }

  render() {
    return (
      <li className='grocery-item'>
        <span onClick={(event) => {this.removeFromList(event)}} className="grocery-name"> {this.props.name} </span>
        <span className="grocery-quantity"> {this.props.quantity} </span>
        <button onClick={() => this.decrement()}> - </button>
        <button onClick={() => this.increment()}> + </button>
      </li>
    );
  }
};

export default GroceryItem;
// {
//   params: {
//     name: event.target.innerText
//   }
// })