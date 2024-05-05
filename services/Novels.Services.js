"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NovelService = void 0;
const mongodb_1 = require("mongodb");
const database_services_1 = require("./database.services");
class novelService {
    constructor() {
        this.getListNovelByListId = async (listNovelId) => {
            if (!listNovelId) {
                const result = await database_services_1.databaseService.getListNovel.find({}).toArray();
                return result;
            }
            else {
                const result = [];
                if (typeof listNovelId === 'string') {
                    await database_services_1.databaseService.getListNovel.findOne({ _id: new mongodb_1.ObjectId(listNovelId) }).then((document) => {
                        if (document) {
                            result.push(document);
                        }
                    });
                }
                else {
                    await Promise.all(listNovelId.map(async (id) => {
                        const document = await database_services_1.databaseService.getListNovel.findOne({ _id: new mongodb_1.ObjectId(id) });
                        if (document) {
                            result.push(document);
                        }
                    }));
                }
                return result;
            }
        };
        this.searchNovel = async (description) => {
            const result = await database_services_1.databaseService.getListNovel.find({ novelName: { $regex: description } }).toArray();
            return result;
        };
        this.getAllChapterOfNovel = async (novelCode) => {
            const result = await database_services_1.databaseService.NovelDB.collection(`${novelCode}`).find({}).toArray();
            return result;
        };
        this.increaseView = async (chapterId, novelCode) => {
            const novel = await database_services_1.databaseService.getListNovel.findOne({ novelCode });
            const categories = novel?.category || [];
            // Increment view count for each category
            const categoryUpdates = categories.map(async (category) => {
                await database_services_1.databaseService.getCategory.updateOne({ categoryName: category }, { $inc: { view: 1 } });
            });
            // Increment view counts for novel and chapter
            const novelUpdate = database_services_1.databaseService.getListNovel.updateOne({ novelCode: novelCode }, { $inc: { view: 1 } });
            const chapterUpdate = database_services_1.databaseService.NovelDB.collection(novelCode).updateOne({ _id: new mongodb_1.ObjectId(chapterId) }, { $inc: { view: 1 } });
            // Wait for all updates to complete
            await Promise.all([...categoryUpdates, novelUpdate, chapterUpdate]);
            return { success: true };
        };
        this.getListNovelSortedByView = async () => {
            const result = await database_services_1.databaseService.getListNovel.find({}).sort({ view: -1 }).toArray();
            return result;
        };
        this.getListNovelSortedAlphabetically = async () => {
            const result = await database_services_1.databaseService.getListNovel.find({}).sort({ novelName: 1 }).toArray();
            return result;
        };
        this.getAllCategory = async () => {
            const result = await database_services_1.databaseService.getCategory.find({}).toArray();
            return result;
        };
        this.getChapterById = async (chapterId, novelCode) => {
            const result = await database_services_1.databaseService.NovelDB.collection(`${novelCode}`).findOne({ _id: new mongodb_1.ObjectId(chapterId) });
            return result;
        };
        this.getPreviousChapter = async (chapterId, novelCode) => {
            const chapter = await database_services_1.databaseService.NovelDB.collection(`${novelCode}`).findOne({ _id: new mongodb_1.ObjectId(chapterId) });
            if (chapter) {
                const chapterNumber = chapter.chapterNumber;
                if (chapterNumber === 1) {
                    return chapter;
                }
                const previousChapter = await database_services_1.databaseService.NovelDB.collection(`${novelCode}`).findOne({ chapterNumber: chapterNumber - 1 });
                return previousChapter;
            }
        };
        this.getNextChapter = async (chapterId, novelCode) => {
            const chapter = await database_services_1.databaseService.NovelDB.collection(`${novelCode}`).findOne({ _id: new mongodb_1.ObjectId(chapterId) });
            if (chapter) {
                const novelId = chapter.parentID;
                const novel = await database_services_1.databaseService.getListNovel.findOne({ _id: new mongodb_1.ObjectId(novelId) });
                if (novel) {
                    const episodes = novel.episodes;
                    const chapterNumber = chapter.chapterNumber;
                    if (chapterNumber === episodes) {
                        return chapter;
                    }
                    const nextChapter = await database_services_1.databaseService.NovelDB.collection(`${novelCode}`).findOne({ chapterNumber: chapterNumber + 1 });
                    return nextChapter;
                }
            }
        };
        this.increaseFollow = async (novelId) => {
            const novel = await database_services_1.databaseService.getListNovel.updateOne({ _id: new mongodb_1.ObjectId(novelId) }, {
                $inc: { followed: 1 }
            });
            return novel;
        };
        this.decreaseFollow = async (novelId) => {
            const novel = await database_services_1.databaseService.getListNovel.updateOne({ _id: new mongodb_1.ObjectId(novelId) }, { $inc: { followed: -1 } } // Sử dụng $inc để giảm giá trị của trường followed đi 1
            );
            return novel;
        };
        this.updateNovelStatus = async () => {
            const listNovel = await database_services_1.databaseService.getListNovel.find().toArray();
            listNovel.forEach(async (novel) => {
                const { novelCode, episodes, _id } = novel;
                if (episodes > 0) {
                    await database_services_1.databaseService.getListNovel.updateOne({ _id }, {
                        $set: { followed: 0 }
                    });
                }
            });
            return "update successfully!";
        };
    }
}
exports.NovelService = new novelService();
