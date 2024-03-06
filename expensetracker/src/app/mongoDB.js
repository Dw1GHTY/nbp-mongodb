import { MongoClient } from "mongodb";

const URI = 'mongodb+srv://lord0160:nJOMugparYGUPiFX@danilobaza.yrpkan0.mongodb.net/'
const options = {}

if (!URI) throw new Error("Problem sa URI")

let client = new MongoClient(URI, options)
let clientPromise

if(process.env.NODE_ENV !== 'production')
{
    if(!global._mongoClientPromise) {
        global._mongoClientPromise = client.connect()
    }

    clientPromise = global._mongoClientPromise
}
else
{
    clientPromise = client.connect()
}

export default clientPromise