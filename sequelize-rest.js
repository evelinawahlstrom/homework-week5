
const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");

const app = express();
const port = 4000;

const sequelize = new Sequelize("postgres://postgres:secret@localhost:5432/postgres");


const Movie = sequelize.define("movie", {
    title: Sequelize.STRING,
    yearOfRelease: Sequelize.INTEGER,
    synopsis: Sequelize.STRING
});

sequelize
  .sync({ force: true })
  .then(() => {
  console.log('Database schema updated')
  const movieProps = [
    {title: "Joker", yearOfRelease: 2019, synopsis: "sad_man"},
    {title: "Batman", yearOfRelease: 2016, synopsis: "always be yourself, unless you can be batman"},
    {title: "Catwoman", yearOfRelease: 2014, synopsis: "grlpwr"}
  ]
  const movies = movieProps.map(movieProp => Movie.create({ title: movieProp.title, yearOfRelease: movieProp.yearOfRelease, synopsis: movieProp.synopsis  }))
  return Promise.all(movies)
  })
  .catch(console.error)


app.use(bodyParser.json());


app.post("/movies", (req, res, next) => {
  Movie.create(req.body)
    .then(movie => res.json(movie))
    .catch(next)
});

app.get("/movies", (req, res, next) => {
  Movie.findAll()
    .then(movies => {
      res.json(movies);
    })
    .catch(next);
});


app.get("/movies/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
  .then(movie => {
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).end();
    }
  })
  .catch(next);
});

app.put("/movies/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => {
      if (movie) {
        movie
          .update(req.body)
          .then(movie => res.json(movie));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

app.delete("/movies/:id", (req, res, next) => {
  Movie.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(numDeleted => {
      if (numDeleted) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

