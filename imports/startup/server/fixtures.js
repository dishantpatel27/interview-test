import { Meteor } from "meteor/meteor";
import { Merchants } from "../../api/merchants/collection.js";
import { Orders } from "../../api/orders/collection.js";
import { Likes } from "../../api/likes/collection.js";
import mockMerchantData from "./mockMerchantData.json";

Meteor.startup(() => {
  // If DB is empty, add mock data
  if (Merchants.find().count() === 0) {
    // Create a new database document for each merchant.
    mockMerchantData.forEach((merchantData, i) =>
      Merchants.insert({
        ...merchantData
      })
    );
  }
  Meteor.publish("orders.cart", function ordersPublication() {
    if (!this.userId) {
      return this.ready();
    }
    return Orders.find({
      "product.user_id": this.userId
    });
  });
  Meteor.publish("likes", function ordersPublication() {
    if (!this.userId) {
      return this.ready();
    }
    return Likes.find({ 
      "user_id": this.userId 
    });
  });
});
