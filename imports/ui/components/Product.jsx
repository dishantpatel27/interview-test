// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button.jsx";

import {Orders} from "../../api/orders/collection";

class Product extends PureComponent {
  constructor(props){
    super(props);
    this.state ={
      quantity: 0
    }
  }
  handleBuyProduct = () => {
    if(!(Meteor.user())){
      
    }
    let product= {
      name: this.props.name,
      image: this.props.image,
      brand: this.props.brand,
      color: this.props.color,
      description: this.props.description,
      price: this.props.price,
      size: this.props.size,
      quantity: this.state.quantity,
      owner: Meteor.userId() 
    };
    
    Orders.insert({product});
    console.log(Orders.find().fetch());
    alert("Selection added!");
  };
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
          <Button onClick={this.handleBuyProduct} >
            Buy {name}
          </Button>
        </div>
      </div>
    );
  }
}

export default Product;
