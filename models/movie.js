// Create our SQL schema
module.exports = function(sequelize, DataTypes) {
  var Movie = sequelize.define("Movie", {
    
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    poster: {
      type: DataTypes.STRING,
      validate: {
        isURL: true
      }
    },
    year: {
      type: DataTypes.STRING,
      
    },
    synopsis: {
      type: DataTypes.TEXT,
      
    }
  });
  //  Define function to associate movies in db to logged in user
  Movie.associate = function(models) {
    Movie.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Movie;
};

