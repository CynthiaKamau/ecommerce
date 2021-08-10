var DataTypes = require("sequelize").DataTypes;
var _cart_item = require("./cart_item");
var _discount = require("./discount");
var _order_items = require("./order_items");
var _orders = require("./orders");
var _payment_details = require("./payment_details");
var _payment_methods = require("./payment_methods");
var _product_category = require("./product_category");
var _product_rating = require("./product_rating");
var _product_stock = require("./product_stock");
var _products = require("./products");
var _roles = require("./roles");
var _shopping_session = require("./shopping_session");
var _suppliers = require("./suppliers");
var _user_payment = require("./user_payment");
var _users = require("./users");

function initModels(sequelize) {
  var cart_item = _cart_item(sequelize, DataTypes);
  var discount = _discount(sequelize, DataTypes);
  var order_items = _order_items(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var payment_details = _payment_details(sequelize, DataTypes);
  var payment_methods = _payment_methods(sequelize, DataTypes);
  var product_category = _product_category(sequelize, DataTypes);
  var product_rating = _product_rating(sequelize, DataTypes);
  var product_stock = _product_stock(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var shopping_session = _shopping_session(sequelize, DataTypes);
  var suppliers = _suppliers(sequelize, DataTypes);
  var user_payment = _user_payment(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  products.belongsTo(discount, { as: "discount", foreignKey: "discount_id"});
  discount.hasMany(products, { as: "products", foreignKey: "discount_id"});
  order_items.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order_items, { as: "order_items", foreignKey: "order_id"});
  payment_details.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(payment_details, { as: "payment_details", foreignKey: "order_id"});
  orders.belongsTo(payment_methods, { as: "payment", foreignKey: "payment_id"});
  payment_methods.hasMany(orders, { as: "orders", foreignKey: "payment_id"});
  user_payment.belongsTo(payment_methods, { as: "payment", foreignKey: "payment_id"});
  payment_methods.hasMany(user_payment, { as: "user_payments", foreignKey: "payment_id"});
  products.belongsTo(product_category, { as: "category", foreignKey: "category_id"});
  product_category.hasMany(products, { as: "products", foreignKey: "category_id"});
  products.belongsTo(product_stock, { as: "stock", foreignKey: "stock_id"});
  product_stock.hasMany(products, { as: "products", foreignKey: "stock_id"});
  cart_item.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(cart_item, { as: "cart_items", foreignKey: "product_id"});
  order_items.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(order_items, { as: "order_items", foreignKey: "product_id"});
  product_rating.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_rating, { as: "product_ratings", foreignKey: "product_id"});
  users.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(users, { as: "users", foreignKey: "role_id"});
  cart_item.belongsTo(shopping_session, { as: "session", foreignKey: "session_id"});
  shopping_session.hasMany(cart_item, { as: "cart_items", foreignKey: "session_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  shopping_session.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(shopping_session, { as: "shopping_sessions", foreignKey: "user_id"});
  suppliers.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(suppliers, { as: "suppliers", foreignKey: "created_by"});
  suppliers.belongsTo(users, { as: "deleted_by_user", foreignKey: "deleted_by"});
  users.hasMany(suppliers, { as: "deleted_by_suppliers", foreignKey: "deleted_by"});
  suppliers.belongsTo(users, { as: "restored_by_user", foreignKey: "restored_by"});
  users.hasMany(suppliers, { as: "restored_by_suppliers", foreignKey: "restored_by"});
  suppliers.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(suppliers, { as: "updated_by_suppliers", foreignKey: "updated_by"});
  user_payment.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_payment, { as: "user_payments", foreignKey: "user_id"});
  users.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(users, { as: "users", foreignKey: "created_by"});
  users.belongsTo(users, { as: "deleted_by_user", foreignKey: "deleted_by"});
  users.hasMany(users, { as: "deleted_by_users", foreignKey: "deleted_by"});
  users.belongsTo(users, { as: "restored_by_user", foreignKey: "restored_by"});
  users.hasMany(users, { as: "restored_by_users", foreignKey: "restored_by"});
  users.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(users, { as: "updated_by_users", foreignKey: "updated_by"});

  return {
    cart_item,
    discount,
    order_items,
    orders,
    payment_details,
    payment_methods,
    product_category,
    product_rating,
    product_stock,
    products,
    roles,
    shopping_session,
    suppliers,
    user_payment,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
