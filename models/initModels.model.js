const{Meal}=require('./meal.model')
const{Order}=require('./order.model')
const{Restaurant}=require('./restaurant.model')
const{Review}=require('./review.model')
const{User}=require('./user.model')


const initModel = ()=>{
   
    //1 Restaurant <----> M Review
    Restaurant.hasMany(Review, {foreignKey:'restaurantID'})
    Review.belongsTo(Restaurant)

    //1 User  <-----> M Review
    User.hasMany(Review, {foreignKey:'userId'})
    Review.belongsTo(User)

    //1 User <-----> M Orders
    User.hasMany(Order, {foreignKey:'userId'}),
    Order.belongsTo(User)

    //1 Restaurant   <------> M meals
    Restaurant.hasMany(Meal, {foreignKey:'restaurantId'})
    Meal.belongsTo(Restaurant)

    //1 Order <------> M meals

    Order.hasMany(Meal, {foreignKey:'mealId'})
    Meal.belongsTo(Order)
}


module.exports = {initModel}