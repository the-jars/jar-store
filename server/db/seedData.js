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
    status: true,
    categoryId: 1
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
    status: true,
    inventory: 7
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
    reviewText: 'Cool'
  },
  {
    rating: 5,
    reviewText: 'Cool'
  },
  {
    rating: 5,
    reviewText: 'Cool'
  },
  {
    rating: 5,
    reviewText: 'Cool'
  },
  {
    rating: 3,
    reviewText: 'Cool'
  },
  {
    rating: 1,
    reviewText: 'Cool'
  },
  {
    rating: 5,
    reviewText: 'Nut butters are great. What?'
  },
  {
    rating: 5,
    reviewText: 'I love this weird stuff'
  }
]

const orderData = [
  {shippingStatus: 'Delivered'},
  {shippingStatus: 'Canceled'},
  {shippingStatus: 'Processing'},
  {shippingStatus: 'Processing'},
  {shippingStatus: 'Canceled'},
  {shippingStatus: 'Delivered'}
]

const userData = [
  {
    email: 'usera@test.test',
    password: 'password',
    username: 'usera',
    firstName: 'AFirstName',
    lastName: 'ALastName',
    addressId: 1
  },
  {
    email: 'userb@test.test',
    password: 'password',
    username: 'userb',
    firstName: 'BFirstName',
    lastName: 'BLastName',
    addressId: 1
  },
  {
    email: 'userc@test.test',
    password: 'password',
    username: 'userc',
    firstName: 'CFirstName',
    lastName: 'CLastName',
    addressId: 2
  },
  {
    email: 'alex@test.test',
    password: 'password',
    username: 'alex',
    firstName: 'Alex',
    lastName: 'L',
    addressId: 3
  },
  {
    email: 'steffeni@test.test',
    password: 'password',
    username: 'steffeni',
    firstName: 'Steffeni',
    lastName: 'V',
    isAdmin: true
  },
  {
    email: 'jake@test.test',
    password: 'password',
    username: 'jake',
    firstName: 'Jake',
    lastName: 'H'
  },
  {
    email: 'rose@test.test',
    password: 'password',
    username: 'rose',
    firstName: 'Rose',
    lastName: 'G',
    isAdmin: true
  }
]

const orderProductData = [{quantity: 12}, {quantity: 12}, {quantity: 12}]

const cartData = [
  {
    status: 'active'
  },
  {
    status: 'active'
  },
  {
    status: 'inactive'
  },
  {
    status: 'inactive'
  }
]

const cartItemData = [
  {quantity: 1},
  {quantity: 1},
  {quantity: 2},
  {quantity: 2},
  {quantity: 3},
  {quantity: 3}
  // {quantity: 1},
  // {quantity: 1},
  // {quantity: 2},
  // {quantity: 2},
  // {quantity: 3},
  // {quantity: 3}
]

module.exports = {
  addressData,
  productData,
  categoryData,
  productCategoryData,
  reviewData,
  orderData,
  userData,
  orderProductData,
  cartData,
  cartItemData
}
