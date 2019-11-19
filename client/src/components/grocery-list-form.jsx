// jshint esversion:6
import React from 'react';
import axios from 'axios';

class GroceryListForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: '',
      quantity: ''
    };

    this.itemHandleChange = this.itemHandleChange.bind(this);
    this.quantityHandleChange = this.quantityHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  itemHandleChange(event) {
    this.setState({item: event.target.value});
  }

  quantityHandleChange(event) {
    this.setState({quantity: event.target.value});
  }

  handleSubmit(event) {
    this.setState({
      item: '',
      quantity: ''
    });

    axios.post('http://localhost:3000/groceries', {
      name: this.state.item,
      quantity: this.state.quantity
    })
      .then(() => this.props.getGroceries())
      .catch(err => console.log(err));

      event.preventDefault();
  }

  render() {
    return (
      <form>
        <label> Item
          <input name="item" onChange={this.itemHandleChange} value={this.state.item}/>
        </label>
        <label> Quantity
          <input name="quantity" onChange={this.quantityHandleChange} value={this.state.quantity}/>
        </label>
        <button onClick={this.handleSubmit}>Add Grocery</button>
      </form>
    );
  }
};

export default GroceryListForm;