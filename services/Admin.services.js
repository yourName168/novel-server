"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServices = void 0;
const mongodb_1 = require("mongodb");
const Novel_Schema_1 = require("../models/schemas/Novel.Schema");
const database_services_1 = require("./database.services");
class AdminServices {
    constructor() {
        this.addChapterbyNovelId = async (payload) => {
            const parentID = new mongodb_1.ObjectId(payload.novelID);
            await database_services_1.databaseService.getListNovel.updateOne({ _id: parentID }, {
                $inc: { Epspisode: 1 }
            });
            const novel = await database_services_1.databaseService.getListNovel.findOne({ _id: parentID });
            if (!novel)
                throw new Error('Novel not found');
            const novelCode = novel.novelCode;
            const novelColection = database_services_1.databaseService.NovelDB.collection(`${novelCode}`);
            const maxNum = (await novelColection.countDocuments()) + 1;
            const result = await novelColection.insertOne(new Novel_Schema_1.Chapter({ ...payload, parentID: parentID.toString(), novelCode, chapterNumber: maxNum }));
            return result;
        };
        this.addNovel = async (payload) => {
            const collection = database_services_1.databaseService.getListNovel;
            const maxNum = (await collection.countDocuments()) + 1;
            const novelCode = `novel-${maxNum}`;
            const result = await collection.insertOne(new Novel_Schema_1.Novel({ ...payload, novelCode }));
            database_services_1.databaseService.NovelDB.createCollection(`${novelCode}`);
            const categoryName = payload.category;
            categoryName.map(async (category) => {
                const documentCategoryName = await database_services_1.databaseService.getCategory.findOne({ categoryName: category });
                if (documentCategoryName) {
                    const res = await database_services_1.databaseService.getCategory.updateOne({ categoryName: category }, { $push: { novelId: result.insertedId } });
                }
                else {
                    const res = await database_services_1.databaseService.getCategory.insertOne({
                        categoryName: category,
                        novelId: [result.insertedId]
                    });
                }
            });
            return result;
        };
        this.updateNovel = async (payload) => {
            const collection = database_services_1.databaseService.getListNovel;
            const result = await collection.updateOne({ _id: new mongodb_1.ObjectId(payload.novelID) }, { $set: { ...payload } });
            return result;
        };
        this.updateChapter = async (payload) => {
            const parentID = new mongodb_1.ObjectId(payload.novelID);
            const novel = await database_services_1.databaseService.getListNovel.findOne({ _id: parentID });
            if (!novel)
                throw new Error('Novel not found');
            const novelCode = novel.novelCode;
            const novelColection = database_services_1.databaseService.NovelDB.collection(`${novelCode}`);
            const result = await novelColection.updateOne({ _id: new mongodb_1.ObjectId(payload.chapterId) }, { $set: { ...payload } });
            return result;
        };
        this.deleteNovel = async (payload) => {
            const collection = database_services_1.databaseService.getListNovel;
            const result = await collection.deleteOne({ _id: new mongodb_1.ObjectId(payload.novelId) });
            return result;
        };
        this.deleteChapter = async (payload) => {
            const parentID = new mongodb_1.ObjectId(payload.novelId);
            await database_services_1.databaseService.getListNovel.updateOne({ _id: parentID }, {
                $inc: { Epspisode: -1 }
            });
            const novel = await database_services_1.databaseService.getListNovel.findOne({ _id: parentID });
            if (!novel)
                throw new Error('Novel not found');
            const novelCode = novel.novelCode;
            const novelColection = database_services_1.databaseService.NovelDB.collection(`${novelCode}`);
            const result = await novelColection.deleteOne({ _id: new mongodb_1.ObjectId(payload.chapterId) });
            return result;
        };
    }
}
exports.adminServices = new AdminServices();
