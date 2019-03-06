// 'use strict'
const nodemailer = require('nodemailer')
const router = require('express').Router()
// async..await is not allowed in global scope, must use a wrapper
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'issac.johnston@ethereal.email', // generated ethereal user
    pass: '8Ft3vNKqNHFpBmrEYJ' // generated ethereal password
  }
})

//func that creates email
//get vars from body in post
//call email generating func
//send mail with result of email generating func

router.post('/sendconfirmationemail', function(req, res) {
  const mailOptions = {
    from: '"Fred Foo" <foo@example.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Congrats on your jars!', // plain text body
    html: '<b>Hello world?</b>' // html body
  }

  transporter.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.err('nodemailer error', error)
      res.sendStatus(500)
    } else {
      res.json(response)
    }
  })
})

module.exports = router
