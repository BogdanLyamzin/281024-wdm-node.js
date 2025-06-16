import Type from "./Type.js";
import Movie from "./Movie.js";

Type.hasMany(Movie, {
    foreignKey: "typeId",
    as: "movies"
});

Movie.belongsTo(Type, {
    foreignKey: "typeId",
    as: "type"
})