const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // mock model for testing with all default value excpet required name
  let penutButter
  beforeEach(async () => {
    penutButter = await Product.create({
      name: 'Peanut Butter'
    })
  })

  // test for product creation
  // ** 2 describe
  describe('creating product row', () => {
    // test validation for name field
    describe('requires name field', () => {
      // holder for the error
      let error
      // holder for failed product creation
      let nullProduct

      // creating product row without a name should throw an error
      it('to not be null', async () => {
        // await row creation and acquire the error for testing
        nullProduct = await Product.create()
          .then(product => product)
          .catch(err => {
            error = err
            return err
          })
        // returned product from passing no name should throw sequelize validation error
        expect(nullProduct).to.be.equal(error)
        expect(nullProduct.name).to.be.equal('SequelizeValidationError')
        // shold throw validation from "notNull: true" field
        expect(nullProduct.errors[0].type).to.be.equal('notNull Violation')
      })
      // cannot use empty string for the product name
      it('to not be empty string', async () => {
        nullProduct = await Product.create({
          name: ''
        }).catch(err => {
          error = err
          return err
        })
        expect(nullProduct).to.be.equal(error)
        expect(nullProduct.name).to.be.equal('SequelizeValidationError')
        // should throw validation error from the "validate { notEmpty: true }" option
        expect(nullProduct.errors[0].type).to.be.equal('Validation error')
      })
    }) // end describe('requires name field')

    // test defaultValue for other fields
    describe('designates default values', () => {
      it('for price as 0.00', () => {
        expect(penutButter.price).to.be.equal('0.00')
      })

      it('for size to be small', () => {
        expect(penutButter.size).to.be.equal('small')
      })
      it('for flavor to be none', () => {
        expect(penutButter.flavor).to.be.equal('none')
      })
      it('for description to be "Jar full of goodies"', () => {
        expect(penutButter.description).to.be.equal('Jar full of goodies')
      })
      it('for inventory to be 0', () => {
        expect(penutButter.inventory).to.be.equal(0)
      })
    }) // end describe('designates default values')
  }) // end describe('creating product row')

  describe('price field', () => {
    it('always returns decimal value with precesion of 2', async () => {
      await penutButter.update({price: 0.6043433})
      const updatedButter = await Product.findOne({
        where: {
          name: 'Peanut Butter'
        }
      })
      expect(updatedButter.price).to.be.equal('0.60')
    })
  }) // end describe('price field')
}) // end describe('Product model')
