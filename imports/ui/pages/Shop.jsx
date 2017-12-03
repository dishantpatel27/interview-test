// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";
import {Orders} from "../../api/orders/collection";
class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      error: null,
      count: 0
    };
  }

  componentWillMount() {
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ merchants: response }));
      }
    });
    const handle = Meteor.subscribe('orders.cart');
    Tracker.autorun(() => {
      const isReady = handle.ready();
      if(isReady){
          let data = Orders.find().fetch();
          this.setState({count:data.length});  
      } 
    });
    
  }

  goBack = () => this.props.history.push("/");

  render() {
    console.log("props",this.props.count);
    
    const { merchants, error } = this.state;

    const getProductsFromMerchant = ({ products, brands }) =>
      products.map(({ belongsToBrand, ...product }) => ({
        ...product,
        brand: brands[belongsToBrand]
      }));

    const products = merchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );

    return (
      
      <Page pageTitle="shop"  history goBack={this.goBack} >
        <div className="shop-page">
        <a href="/cart"style={{width: 50 + 'px',margin: 6 + 'px',padding: 3 + 'px'}}>Cart({this.state.count})</a>
          {products.map(({ id, ...product }) =>
            <Product {...product} key={id} />
          )}
        </div>
      </Page>
      
    );
  }
}

export default Shop;
