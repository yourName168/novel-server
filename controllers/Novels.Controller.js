"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEpisodesController = exports.getNextChapterController = exports.getPreviousChapterController = exports.getChapterController = exports.getListCategoryController = exports.getListNovelSortedAlphabeticallyController = exports.getListNovelSortedByViewController = exports.increaseNovelViewController = exports.getChapterOfNovelController = exports.searchNovelController = exports.getListNovelByListIdController = void 0;
const Novels_Services_1 = require("../services/Novels.Services");
const getListNovelByListIdController = async (req, res, next) => {
    const listNovelId = req.query.listNovelId;
    const result = await Novels_Services_1.NovelService.getListNovelByListId(listNovelId);
    res.send(result);
};
exports.getListNovelByListIdController = getListNovelByListIdController;
const searchNovelController = async (req, res, next) => {
    const { description } = req.body;
    const result = await Novels_Services_1.NovelService.searchNovel(description);
    res.send(result);
};
exports.searchNovelController = searchNovelController;
const getChapterOfNovelController = async (req, res, next) => {
    const novelCode = req.query.novelCode;
    const result = await Novels_Services_1.NovelService.getAllChapterOfNovel(novelCode);
    res.send(result);
};
exports.getChapterOfNovelController = getChapterOfNovelController;
const increaseNovelViewController = async (req, res, next) => {
    const { chapterId, novelCode } = req.body;
    const result = await Novels_Services_1.NovelService.increaseView(chapterId, novelCode);
    res.send(result);
};
exports.increaseNovelViewController = increaseNovelViewController;
const getListNovelSortedByViewController = async (req, res, next) => {
    const result = await Novels_Services_1.NovelService.getListNovelSortedByView();
    res.send(result);
};
exports.getListNovelSortedByViewController = getListNovelSortedByViewController;
const getListNovelSortedAlphabeticallyController = async (req, res, next) => {
    const result = await Novels_Services_1.NovelService.getListNovelSortedAlphabetically();
    res.send(result);
};
exports.getListNovelSortedAlphabeticallyController = getListNovelSortedAlphabeticallyController;
const getListCategoryController = async (req, res, next) => {
    const result = await Novels_Services_1.NovelService.getAllCategory();
    res.send(result);
};
exports.getListCategoryController = getListCategoryController;
const getChapterController = async (req, res, next) => {
    const chapterId = req.query.chapterId;
    const novelCode = req.query.novelCode;
    const result = await Novels_Services_1.NovelService.getChapterById(chapterId, novelCode);
    res.send(result);
};
exports.getChapterController = getChapterController;
const getPreviousChapterController = async (req, res, next) => {
    const chapterId = req.query.chapterId;
    const novelCode = req.query.novelCode;
    const result = await Novels_Services_1.NovelService.getPreviousChapter(chapterId, novelCode);
    res.send(result);
};
exports.getPreviousChapterController = getPreviousChapterController;
const getNextChapterController = async (req, res, next) => {
    const chapterId = req.query.chapterId;
    const novelCode = req.query.novelCode;
    const result = await Novels_Services_1.NovelService.getNextChapter(chapterId, novelCode);
    res.send(result);
};
exports.getNextChapterController = getNextChapterController;
const updateEpisodesController = async (req, res, next) => {
    const result = await Novels_Services_1.NovelService.updateNovelStatus();
    res.send(result);
};
exports.updateEpisodesController = updateEpisodesController;
