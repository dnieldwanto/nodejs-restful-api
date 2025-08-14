const Users = require("./users");
const Contacts = require("./contacts");
const Address = require("./address");
const Categories = require("./categories");
const Suppliers = require("./suppliers");
const Products = require("./products");
const Carts = require("./carts");
const Vouchers = require("./vouchers");

module.exports = {
  ...Users,
  ...Contacts,
  ...Address,
  ...Categories,
  ...Suppliers,
  ...Products,
  ...Carts,
  ...Vouchers
};