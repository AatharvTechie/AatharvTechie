require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let _db = null;

async function mongoConnect() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    _db = client.db("JWTAuthentication"); // DB name check karo
    console.log("✅ Database Selected:", _db.databaseName);
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
  }
}

mongoConnect();

const get_db = () => {
  if (!_db) {
    throw new Error("database connection failed");
  }
  console.log(_db);
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.get_db = get_db;
