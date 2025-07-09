/*
1. Абстракция - мы описываем только те свойства и методы,
которые нужны для выполнения задач. 
2. Инкапсуляция - класс предоставляет интерфейс взаимодействия
(публичные свойства и методы), скрывая их реализацию через приватные
свойства и методы. 
3. Наследование - создаем новые классы на основе предыдущих если это возможно,
вместо создания классов с нуля. 
4. Полиморфизм - методы могут вести себя по разному в зависимост от контекста 
(у разных дочерних классов они могут работать по разному)
*/
// Принцип SOLID

type User = {
  userName: string;
  userLastName: string;
}

const user: User = {
  userName: "Bohdan",
  userLastName: "Liamzin"
};

const {userName, userLastName}: User = user;

const admin = {
  name: userName,
  lastName: userLastName
}

type ProductArgs = {
  name: string;
  description: string;
  price: number;
  stock?: boolean;
}


// interface IProduct {
//   name: string;
//   description: string;
//   _price: number;
//   stock: boolean;
// }

// class Product implements IProduct {
//   name;
//   description;
//   _price;
//   stock;

//   constructor({ name, description, price, stock = false }:ProductArgs) {
//     this.name = name;
//     this.description = description;
//     this._price = price;
//     this.stock = stock;
//   }

//   getPrice(): number {
//     return this._price;
//   }

//   setPrice(value: number) {
//     if(value > 0) {
//         this._price = value;
//     }
//   }
// }

class Product {
  name: string;
  description: string;
  _price: number;
  stock: boolean = false;

  constructor({ name, description, price }:ProductArgs) {
    /*
    this = {

    }
    */
    this.name = name;
    // this.name;
    // this.name = name;
    this.description = description;
    this._price = price;
  }

  getPrice(): number {
    return this._price;
  }

  setPrice(value: number) {
    if(value > 0) {
        this._price = value;
    }
  }
}

const product1 = new Product({
  name: "Lenovo X120S",
  description: "Лучший ноутбук 2019 года",
  price: 1200,
});
console.log(product1);
