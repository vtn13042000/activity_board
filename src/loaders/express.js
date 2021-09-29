const express = require('express');
const httpStatus = require('http-status');
const router = require('../router')


module.exports = () => {
  PORT = process.env.PORT

// body
  const server = express();
  server.use(express.json())

  server.get('/', (req, res) => {
    return res.status(httpStatus.OK).send('welcome')
  })


  server.use('/', router)
  console.log(PORT);
  
  server.listen(PORT, () => {
    console.log(`server is initalized on port ${PORT}` );
  })

  


}