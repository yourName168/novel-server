"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chapter = exports.Novel = void 0;
const Novels_Request_1 = require("../requests/Novels.Request");
class Novel {
    constructor(novel) {
        this.getNovelCode = () => this.novelCode;
        this.getEpisodes = () => this.episodes;
        this.descriptionURL = novel.descriptionURL;
        this.novelCode = novel.novelCode;
        this.authorName = novel.authorName;
        this.episodes = 0;
        this.descriptionImage = novel.descriptionImage;
        this.novelName = novel.name;
        this.category = novel.category;
        this.view = 0;
        this.status = Novels_Request_1.NovelStatus.upcoming;
        this.followed = 0;
    }
}
exports.Novel = Novel;
class Chapter {
    constructor(chapter) {
        this.parentID = chapter.parentID;
        this.novelCode = chapter.novelCode;
        this.chapterNumber = chapter.chapterNumber;
        this.contentURL = chapter.contentURL;
        this.chapterName = chapter.chapterName;
    }
}
exports.Chapter = Chapter;
