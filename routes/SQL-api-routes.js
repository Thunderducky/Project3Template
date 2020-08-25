const db = require("../models");

module.exports = async function (app) {
    //Find all movies associated with user AND join their userID from users model
    app.get("/api/movies", function (req, res) {
        const uid = req.session.passport.user.id;
        try{
            const dbMovies = await db.Movie.findAll({where: {userId: uid}}, {include: db.User});
            res.json(dbMovies);
        }
        catch(err){
            res.status(500).end();
            console.log(err)
        }
    }),
    app.get("/api/wishlist", function(req, res) {
        const uid = req.session.passport.user.id;
        try{
            const dbMovies = await db.Movie.findAll({where: {userId: uid, wishlist: true}}, {include: db.User});
            res.json(dbMovies);
        }
        catch(err) {
            res.status(500).end();
            console.log(err);
        }
    }),
    // grabs all movies of specified format and not in wishlist
    app.get("/api/movies/:format", function(req, res) {
        const uid = req.session.passport.user.id;
        const format = req.params.format;
        try{
            const dbMovie = await db.Movie.findAll({where: {userId: uid, format: format, wishlist: false }}, {include: db.User});
            res.json(dbMovie);
        }
        catch(err){
            res.status(500).end();
            console.log(err)
        }
    }),
    // grabs movie with specific id
    app.get("/api/movies/:id", function (req, res) {
        const uid = req.session.passport.user.id;
        const id = req.params.id;
        try{
            const dbMovie = await db.Movie.findOne({where: {userId: uid, id: id }}, {include: db.User});
            res.json(dbMovie);
        }
        catch(err){
            res.status(500).end();
            console.log(err)
        }
    })
}
app.post("/api/movies", function(req, res) { 
        const uid = req.session.passport.user.id;
        req.body.userID = uid;
        try{
            const dbMovie = await db.Movie.create(req.body);
            res.json(dbMovie);
        }
        catch(err){
            res.status(500).end();
            console.log(err)
        }
  });

  app.delete("/api/movies/:id", function(req, res) { 
    
    try{
        const dbMovie = await db.Movie.destroy({where: {id: req.params.id}});
        res.json(dbMovie);
    }
    catch(err){
        res.status(500).end();
        console.log(err)
    }
});