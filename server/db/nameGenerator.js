const butterNames = ['almond', 'hazelnut', 'peanut', 'pecan', 'walnut']

const pepperNamesURL = [
  'bellpepper',
  'chilis',
  'garlic',
  'greenbellpepper',
  'habs',
  'jalapeno'
]

const pepperNames = [
  'red Bell Pepper',
  'chili',
  'garlic',
  'green Bell Pepper',
  'habanero',
  'jalapeno'
]

const preserveNames = [
  'blackberry',
  'blueberry',
  'cherry',
  'raspberry',
  'strawberry'
]

const preserveNuts = [
  'blackberry',
  'blueberry',
  'cherry',
  'raspberry',
  'strawberry',
  'almond',
  'hazelnut',
  'peanut',
  'pecan',
  'walnut'
]

const pepperPreserves = [
  'blackberry',
  'blueberry',
  'cherry',
  'raspberry',
  'strawberry',
  'red Bell Pepper',
  'chili',
  'garlic',
  'green Bell Pepper',
  'habanero',
  'jalapeno'
]

const pepperNuts = [
  'red Bell Pepper',
  'chili',
  'garlic',
  'green Bell Pepper',
  'habanero',
  'jalapeno',
  'almond',
  'hazelnut',
  'peanut',
  'pecan',
  'walnut'
]

const Jellytypes = ['Jam', 'Jelly', 'Preserves']

const JellytypesButter = ['Jam', 'Jelly', 'Preserves', 'Butter']

const JellytypesSalsa = ['Jam', 'Jelly', 'Preserves', 'salsa']

const urlCreator = namesArr => {
  return namesArr.map(name => {
    return `/images/${name}.png`
  })
}

const nameGenerator = (nameArr, typeArr) => {
  let newNames = []
  nameArr.forEach(name => {
    nameArr.forEach(secName => {
      if (secName === name) {
        name = name[0].toUpperCase() + name.slice(1)
        newNames.push(
          name
          //  + ' '
          // + typeArr[Math.floor(Math.random() * typeArr.length)]
        )
      } else {
        name = name[0].toUpperCase() + name.slice(1)
        newNames.push(
          name + ' ' + secName[0].toUpperCase() + secName.slice(1)
          //  +
          // ' ' +
          // typeArr[Math.floor(Math.random() * typeArr.length)]
        )
      }
    })
  })

  newNames.forEach(name => {
    nameArr.forEach(secName => {
      if (!name.includes(secName[0].toUpperCase() + secName.slice(1))) {
        newNames.push(
          name + ' ' + secName[0].toUpperCase() + secName.slice(1)
          //  +
          // ' ' +
          // typeArr[Math.floor(Math.random() * typeArr.length)]
        )
      }
    })
  })
  return newNames.map(name => {
    return name + ' ' + typeArr[Math.floor(Math.random() * typeArr.length)]
  })
}

const butterNamesArr = nameGenerator(butterNames, ['Butter'])
console.log('butters', butterNamesArr.length, JSON.stringify(butterNamesArr))

const salsaNamesArr = nameGenerator(pepperNames, ['Salsa'])
console.log('salsas', salsaNamesArr.length, JSON.stringify(salsaNamesArr))

const jellyNamesArr = nameGenerator(preserveNames, Jellytypes)
console.log('jellies', jellyNamesArr.length, JSON.stringify(jellyNamesArr))

const butterJellies = nameGenerator(preserveNuts, JellytypesButter)
console.log(
  'butterJellies',
  butterJellies.length,
  JSON.stringify(butterJellies)
)

// const salsaJellies = nameGenerator(pepperPreserves, JellytypesSalsa)
// console.log('salsaJellies', JSON.stringify(salsaJellies))

// const salsaButters = nameGenerator(pepperNuts, ['Salsa', 'Butter'])
// console.log('salsaButters', JSON.stringify(salsaButters))

const butterImages = urlCreator(butterNames)
console.log(butterImages)

const salsaImages = urlCreator(pepperNamesURL)
console.log(salsaImages)

const jellyImages = urlCreator(preserveNames)
console.log(jellyImages)

const secWords = [
  'Aged',
  'Bittersweet',
  'Burnt',
  'Buttery',
  'Chewy',
  'Chocolaty',
  'Citrusy',
  'Cool',
  'Creamy',
  'Crispy',
  'Crumbly',
  'Crunchy',
  'Earthy',
  'Fatty',
  'Fermented',
  'Fiery',
  'Fizzy',
  'Flavorful',
  'Fresh',
  'Fruity',
  'Full-bodied',
  'Garlicky',
  'Gingery',
  'Glazed',
  'Gooey',
  'Hearty',
  'Herbal',
  'Hot',
  'Icy',
  'Infused',
  'Juicy',
  'Lean',
  'Lemony',
  'Light',
  'Malty',
  'Mashed',
  'Mellow',
  'Mild',
  'Minty',
  'Moist',
  'Mushy',
  'Nutty',
  'Oniony',
  'Peppery',
  'Pickled',
  'Plain',
  'Raw',
  'Refreshing',
  'Rich',
  'Ripe',
  'Roasted',
  'Robust',
  'Salty',
  'Savory',
  'Seasoned',
  'Sharp',
  'Silky',
  'Smokey',
  'Smooth',
  'Smothered',
  'Soggy',
  'Sour',
  'Spicy',
  'Sticky',
  'Strong',
  'Sweet-and-sour',
  'Syrupy',
  'Tangy',
  'Tart',
  'Toasted',
  'Velvety',
  'Vinegary',
  'Whipped',
  'Zesty',
  'Zingy',
  'Acidic'
]

const firstWords = [
  'Amazing',
  'Appealing',
  'Appetizing',
  'Delectable',
  'Delicious',
  'Delightful',
  'Divine',
  'Enjoyable',
  'Enticing',
  'Excellent',
  'Exquisite',
  'Extraordinary',
  'Fantastic',
  'Finger Licking',
  'Heavenly',
  'Lip Smacking',
  'Luscious',
  'Marvelous',
  'Mouthwatering',
  'Palatable',
  'Pleasant',
  'Pleasing',
  'Satisfying',
  'Scrumptious',
  'Superb',
  'Tantalizing',
  'Tasty',
  'Terrific',
  'Wonderful',
  'Yummy'
]

const descriptionGenerator = (firstWords, secWords) => {
  const retArr = []

  firstWords.forEach(word => {
    secWords.forEach(secWord => {
      if (word !== secWord) {
        retArr.push(word + ' ' + 'and' + ' ' + secWord)
      }
    })
  })
  return retArr
}

const descriptions = descriptionGenerator(firstWords, secWords)
console.log('descriptions', descriptions.length, JSON.stringify(descriptions))
