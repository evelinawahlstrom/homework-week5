const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

app.use(jsonParser)

/*{const message = {
  message: " "
}}*/

app.get('/messages', (req, res) => {
  res.send("Hello Evelina, YOU GOT THIS!");
});


app.post('/messages', (req, res) => {
/*{ if (message === null || message === '')
    return res.status(400).json({ status: 400, message: "Message cannot be empty or just a string" })
}*/
  console.log(req.body);
  res.json({
      message: "Message received loud and clear",
  });
});

app.listen(port, () => console.log("listening on port " + port));