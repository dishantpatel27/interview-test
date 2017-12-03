// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
// import Product from "../components/Product";
import {Orders} from "../../api/orders/collection";
class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      error: null
    };
  }

  goBack = () => this.props.history.push("/shop");

  render() {

    const handle = Meteor.subscribe('orders.cart');
    Tracker.autorun(() => {
      const isReady = handle.ready();
      if(isReady){
          let data = Orders.find().fetch();
          this.setState({cartItems:data});  
      } 
    });
    let total = 0;
    return (
      <Page pageTitle="cart"  history goBack={this.goBack} >
        <div className="shop-page"> 
        
            {this.state.cartItems.map((item) =>{
                total += item.product.price * item.product.quantity;
                return (

                    <div className="product" style={{justifyContent:"normal"}}>
                        <img alt={item.product.name} src={item.product.image} />
                        <div className="info-row" key={`${item.product.name}`}>
                            <div className="label">
                                Brand:{item.product.brand}  
                            </div>
                            <div className="label">
                                Name:{item.product.name}  
                            </div>
                            <div className="label">
                                Description:{item.product.description}  
                            </div>
                            <div className="label">
                                Color:{item.product.color}  
                            </div>
                            <div className="label">
                                Size:{item.product.size}  
                            </div>
                            <div className="label">
                                Price:{item.product.price}  
                            </div>
                            <div className="label">
                                Quantity:{item.product.quantity}  
                            </div>
                        </div>
                </div>
                )
                
            })}
        <div className='label'>
        Total: {total}
        </div>
        </div>
        
      </Page>
      
    );
  }
}

export default Shop;
