const { Router } = require('express')
const router = new Router()

//const Message = require('./messages-api')

router.post('/messages', (req, res) => {
  console.log("Hello", req.body);
  res.json({
      message: "Message received loud and clear!",
  });
});



  module.exports = router
