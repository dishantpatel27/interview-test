// @flow

// Framework
import { Mongo } from "meteor/mongo";

// Create new Collection
export const Orders = new Mongo.Collection("orders");
