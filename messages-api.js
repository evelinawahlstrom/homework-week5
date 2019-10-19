const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const router = require ('./router')
const jsonParser = bodyParser.json()

app.use(jsonParser)
app.use(router)

const message = {
    text: ' '
}

app.get('/messages', (req, res) => {
  res.send("Hello Evelina, YOU GOT THIS!");
});

  
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


module.exports = message
module.exports = app