// jshint esversion:6
import React from 'react';
import axios from 'axios';

const GroceryItem = (props) => {

  const removeFromList = (event) => {
    axios.delete(`http://localhost:3000/groceries`, {
      params: {
        name: event.target.innerText
      }
    })
    .then(() => props.getGroceries())
    .catch(err => console.log(err));
  };

  // const increment = () => {
  //   axios.get(`http://localhost:3000/groceries/${}`)
  // };

  // const decrement = () => {

  // };

  return (
    <li className='grocery-item'>
      <span onClick={(event) => {removeFromList(event)}} className="grocery-name"> {props.name} </span>
      <span className="grocery-quantity"> {props.quantity} </span>
    </li>
  );
};

export default GroceryItem;
// {
//   params: {
//     name: event.target.innerText
//   }
// })