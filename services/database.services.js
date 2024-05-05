"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseService = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const databaseUserName = process.env.USERS_DATABASE_USER;
const databasePassword = process.env.USERS_DATABASE_PASSWORD;
const userDBName = process.env.USER_DATABASE_NAME;
const novelDBName = process.env.NOVEL_DATABASE_NAME;
const userCollectionName = process.env.DB_ACCOUNT_COLLECTION;
const listNovelName = process.env.DB_LIST_NOVEL_COLLECTION_NAME;
const catagoryCollectionName = process.env.DB_CATEGORY_COLLECTION_NAME;
const uri = `mongodb+srv://${databaseUserName}:${databasePassword}@useraccount.p0jlcj2.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
class DatabaseService {
    constructor() {
        this.run = async () => {
            try {
                // Connect the client to the server	(optional starting in v4.7)
                await this.client.connect();
                console.log('Pinged your deployment. You successfully connected to MongoDB!');
            }
            catch {
                console.log('Cannot connect to database');
            }
        };
        this.client = new mongodb_1.MongoClient(uri);
        this.userDB = this.client.db(`${userDBName}`);
        this.novelDB = this.client.db(`${novelDBName}`);
    }
    get NovelDB() {
        return this.novelDB;
    }
    get getListNovel() {
        return this.novelDB.collection(`${listNovelName}`);
    }
    get getCategory() {
        return this.novelDB.collection(`${catagoryCollectionName}`);
    }
    get users() {
        return this.userDB.collection(`${userCollectionName}`);
    }
    // từ khóa get giúp cho việt gọi tới hàm users không cần có dấu ()
    // mà chỉ cần gọi tới như một thuộc tính
    // nếu không có get thì sẽ gọi tới giống như một phương thức
    //vd dùng get: databaseService.users
    // vd k dùng get: databaseService.users()
    get refreshToken() {
        return this.userDB.collection(`refreshTokenCollection`);
    }
}
exports.databaseService = new DatabaseService();
