import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const DB_HOST = process.env.DB_HOST || 'localhost';
    const DB_PORT = process.env.DB_PORT || '27017';
    const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';

    const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;


       this.client = new MongoClient(uri, {
           useNewUrlParser: true,
	   useUnifiedTopology: true,
       });
       this.connection = null;
       this.db = null;
    }


    async connect() {
         try {
            await this.client.connect();
            this.connection = this.client.isConnected();
            this.db = this.client.db(); // Get the database instance
            console.log('Connected to MongoDB');
        } catch(err) {
            console.error('Error connecting to MongoDB:', err);
	    this.connection = false; // Update connection status
            throw err; // Rethrow the error to propagate it
        }   
    }

    isAlive() {
        return this.connection;
    }

    async nbUsers() {
        try {
	    const collection = this.db.collection('users');
	    const count = await collection.countDocuments();
	    return count;
	}catch(err) {
	    console.error("Error counting Documents:", err);
	    
	}
    }

    async nbFiles () {
        try {
	    const collection = this.db.collection('files');
	    const count = await collection.countDocuments();
	    return count;
	} catch(error) {
	    console.error("Error counting Documents:", error);
	    
	}
    }
}
// Create and export an instance of DBClient
const dbClient = new DBClient();
dbClient.connect(); // Connect immediately upon creation

export default dbClient;
