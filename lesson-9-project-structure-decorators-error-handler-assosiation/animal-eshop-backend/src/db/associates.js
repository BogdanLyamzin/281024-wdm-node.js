import Product from "./Product.js";
import Category from "./Category.js";

const createAssociates = ()=> {
    Product.associate({Category});
    Category.associate({Product});
}

export default createAssociates;