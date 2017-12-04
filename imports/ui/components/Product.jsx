// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button.jsx";

import {Orders} from "../../api/orders/collection";
import {Likes} from "../../api/likes/collection";


class Product extends PureComponent {
  constructor(props){
    super(props);
    this.state ={
      quantity: 0,
      likeData: []
    }
  }

  
  handleBuyProduct = () => {
    if (! Meteor.userId()) {
      alert("Please Login!");
      throw new Meteor.Error('not-authorized');
    }else{
      if(this.state.quantity > 0){
        let product= {
          name: this.props.name,
          image: this.props.image,
          brand: this.props.brand,
          color: this.props.color,
          description: this.props.description,
          price: this.props.price,
          size: this.props.size,
          quantity: this.state.quantity,
          user_id: Meteor.userId()
        };
          Orders.insert({product});
          
          alert("Selection added!");
        };
      }
    }
handleLikeHelper = () =>{
  if(this.state.likeData.length !== 0){
    this.state.likeData.forEach((item)=>{
      if(String(this.props.name) === String(item['name'])){
        alert("Already Liked!")
        throw new Meteor.Error('Already Liked');
      }
    })
    Likes.insert({ 
      name: this.props.name,
      brand: this.props.brand,
      user_id: Meteor.userId()
    });
    alert("Liked !");
    this.state.likeData = [];
    throw new Meteor.Error('Breaking from likehelper');
  }else{
    Likes.insert({ 
      name: this.props.name,
      brand: this.props.brand,
      user_id: Meteor.userId()
    });
    alert("Liked !");
    throw new Meteor.Error('Breaking from likehelper');
  }
}


  handleLike = () =>{
    if (! Meteor.userId()) {
      alert("Please Login!");
      throw new Meteor.Error('not-authorized');
    }else{ 
      let data = [];
      const handle = Meteor.subscribe('likes');
      Tracker.autorun(() => {
        const isReady = handle.ready();
        if(isReady){
            data = Likes.find().fetch();
            this.setState({likeData: data});
        } 
      });
    };
    this.handleLikeHelper();
  }

 
  getQuantity = (event) =>{
    let quantity = event.target.value;
    this.setState({quantity:quantity})
  }

  render() {
    
    const {
      name = "Product",
      image,
      brand,
      color,
      description,
      price,
      size
    } = this.props;

    const info = [
      { label: "Brand", value: brand },
      { label: "Name", value: name },
      { label: "Description", value: description },
      { label: "Color", value: color },
      { label: "Size", value: size },
      { label: "Price", value: price }
    ];

    return (
      <div className="product">
        <img alt={name} src={image} />
        <div className="details">
          <div className="info">
            {info.map(({ label, value }) =>
              <div className="info-row" key={`${name}-${label}-${value}`}>
                <div className="label">
                  {label}:
                </div>
                <div className="value">
                  {value}
                </div>
              </div>
            )}
          </div>
          <div>
            Quantity:
            <input onClick={this.getQuantity} id="quantity" type="number" step="1" placeholder="0"/>
         </div>
         <Button onClick={this.handleLike} >
            Like
          </Button>
          <Button onClick={this.handleBuyProduct} >
            Buy {name}
          </Button>
        </div>
      </div>
    );
  }
}

export default Product;
