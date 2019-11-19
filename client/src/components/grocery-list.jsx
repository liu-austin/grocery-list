// jshint esversion:6
import React from 'react';
import GroceryItem from './grocery-item.jsx';

const GroceryList = (props) => {
  return (
    <ul className="groceries">
    {
      props.list.length ?
      (
        props.list.map((listitem, index) => {
          return (
            <GroceryItem getGroceries={props.getGroceries} key={index} name={listitem.name} quantity={listitem.quantity}/>
          );
        })
      )
      :
      (
        null
      )
    }
    </ul>
  );
};

export default GroceryList;