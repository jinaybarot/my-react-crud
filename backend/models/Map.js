import mangoose from "mongoose";

const mapSchema = new mangoose.Schema({
    country : { type: String, required: true }
});

const Map = mangoose.model("Map", mapSchema);
export default Map;