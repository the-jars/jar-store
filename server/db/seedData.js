const addressData = [
  {
    type: 'Home - Chicago',
    line_1: '405 W Superior St',
    line_2: '',
    city: 'Chicago',
    state: 'IL',
    zip: '60654'
  },
  {
    type: 'Work - Chicago',
    line_1: '405 W Superior St',
    line_2: '',
    city: 'Chicago',
    state: 'IL',
    zip: '60654'
  },
  {
    type: 'Home - NYC',
    line_1: '5 Hanover Square',
    line_2: 'Floor 11',
    city: 'New York',
    state: 'NY',
    zip: '10004'
  },
  {
    type: 'Work - NYC',
    line_1: '5 Hanover Square',
    line_2: 'Floor 11',
    city: 'New York',
    state: 'NY',
    zip: '10004'
  },
  {
    type: 'Other - Chicago',
    line_1: '405 W Superior St',
    line_2: '',
    city: 'Chicago',
    state: 'IL',
    zip: '60654'
  },
  {
    type: 'Other - NYC',
    line_1: '5 Hanover Square',
    line_2: 'Floor 11',
    city: 'New York',
    state: 'NY',
    zip: '10004'
  }
]

const productData = [
  {
    name: 'Strawberry Preserves',
    price: 10.0,
    status: true
  },
  {
    name: 'Raspberry Jam',
    price: 10.0,
    status: true
  },
  {
    name: 'Apricot Jelly',
    price: 10.0,
    status: true
  },
  {
    name: 'Peanut Butter',
    price: 10.0,
    status: true
  },
  {
    name: 'Almond Butter',
    price: 10.0,
    status: true
  },
  {
    name: 'Serrano Pepper Salsa',
    price: 10.0,
    status: true
  },
  {
    name: 'Hatch Chile & Tomatillo Salsa',
    price: 10.0,
    status: true
  },
  {
    name: 'Peach & Mango Salsa',
    price: 10.0,
    status: true
  },
  {
    name: 'PB&J Monstrosity',
    price: 10.0,
    status: true
  }
]

const categoryData = [
  {name: 'Salsas'},
  {name: 'Jellies, Jams, Preserves'},
  {name: 'Nut Butters'}
]

const productCategoryData = [
  {productId: 1, categoryId: 1},
  {productId: 2, categoryId: 1},
  {productId: 3, categoryId: 1},
  {productId: 4, categoryId: 2},
  {productId: 5, categoryId: 2},
  {productId: 6, categoryId: 3},
  {productId: 7, categoryId: 3},
  {productId: 8, categoryId: 1},
  {productId: 8, categoryId: 3},
  {productId: 9, categoryId: 1},
  {productId: 9, categoryId: 2}
]

const reviewData = [
  {
    rating: 5,
    reviewText: 'Cool',
    productId: 1,
    userId: 1
  },
  {
    rating: 5,
    reviewText: 'Cool',
    productId: 1,
    userId: 2
  },
  {
    rating: 5,
    reviewText: 'Cool',
    productId: 1,
    userId: 3
  },
  {
    rating: 5,
    reviewText: 'Cool',
    productId: 2,
    userId: 4
  },
  {
    rating: 3,
    reviewText: 'Cool',
    productId: 1,
    userId: 4
  },
  {
    rating: 1,
    reviewText: 'Cool',
    productId: 1,
    userId: 6
  },
  {
    rating: 5,
    reviewText: 'Nut butters are great. What?',
    productId: 4,
    userId: 5
  },
  {
    rating: 5,
    reviewText: 'I love this weird stuff',
    productId: 9,
    userId: 4
  }
]

const orderData = [
  {
    shippingStatus: 'Delivered',
    userId: 1
  },
  {
    shippingStatus: 'Canceled',
    userId: 1
  },
  {
    shippingStatus: 'Processing',
    userId: 2
  },
  {
    shippingStatus: 'Processing',
    userId: 3
  },
  {
    shippingStatus: 'Canceled',
    userId: 4
  },
  {
    shippingStatus: 'Delivered',
    userId: 5
  }
]

const userData = [
  {
    email: 'usera@test.test',
    password: 'kdsjghdkaj',
    username: 'usera',
    firstName: 'AFirstName',
    lastName: 'ALastName',
    addressId: 1
  },
  {
    email: 'userb@test.test',
    password: 'kdsjghdkaj',
    username: 'userb',
    firstName: 'BFirstName',
    lastName: 'BLastName',
    addressId: 1
  },
  {
    email: 'userc@test.test',
    password: 'kdsjghdkaj',
    username: 'userc',
    firstName: 'CFirstName',
    lastName: 'CLastName',
    addressId: 2
  },
  {
    email: 'alex@test.test',
    password: 'kdsjghdkaj',
    username: 'alex',
    firstName: 'Alex',
    lastName: 'L',
    addressId: 3
  },
  {
    email: 'steffeni@test.test',
    password: 'kdsjghdkaj',
    username: 'steffeni',
    firstName: 'Steffeni',
    lastName: 'V'
  },
  {
    email: 'jake@test.test',
    password: 'kdsjghdkaj',
    username: 'jake',
    firstName: 'Jake',
    lastName: 'H'
  },
  {
    email: 'rose@test.test',
    password: 'kdsjghdkaj',
    username: 'rose',
    firstName: 'Rose',
    lastName: 'G'
  }
]

module.exports = {
  addressData,
  productData,
  categoryData,
  productCategoryData,
  reviewData,
  orderData,
  userData
}