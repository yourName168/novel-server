"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Novels_Controller_1 = require("../controllers/Novels.Controller");
const handler_1 = require("../utils/handler");
const novelRouter = express_1.default.Router();
novelRouter.get('/get-list-novel-by-list-id', (0, handler_1.wrap)(Novels_Controller_1.getListNovelByListIdController));
/**
 * Description. get all novel from database
 * path: /get-novel
 * mothod: get
 * Query:{listNovelId?:string[]}
 */
novelRouter.post('/search-novel', (0, handler_1.wrap)(Novels_Controller_1.searchNovelController));
/**
 * Description. seach novel by name
 * path: /search-novel
 * mothod: post
 * body:{description:string}
 */
novelRouter.get('/get-chapter-in-novel', (0, handler_1.wrap)(Novels_Controller_1.getChapterOfNovelController));
/**
 * Description. get all chapter from novel
 * path: /get-chapter-in-novel
 * mothod: get
 */
novelRouter.patch('/increase-view', (0, handler_1.wrap)(Novels_Controller_1.increaseNovelViewController));
/**
 * Description. increase view of novel
 * path: /increase-view
 * mothod: PATCH
 * Body:{novelCode:string}
 */
novelRouter.get('/get-novel-sorted-by-view', (0, handler_1.wrap)(Novels_Controller_1.getListNovelSortedByViewController));
/**
 * Description. get all novel sorted by view
 * path: /get-novel-sorted-by-view
 * mothod: get
 */
novelRouter.get('/get-novel-sorted-alphabetically', (0, handler_1.wrap)(Novels_Controller_1.getListNovelSortedAlphabeticallyController));
/**
 * Description. get all novel sorted alphabetically
 * path: /get-novel-sorted-alphabetically
 * mothod: get
 */
novelRouter.get('/get-chapter', (0, handler_1.wrap)(Novels_Controller_1.getChapterController));
/**
 * Description. get 1 chapter by chapter id
 * path: /get-chapter
 * mothod: get
 */
novelRouter.get('/get-all-category', (0, handler_1.wrap)(Novels_Controller_1.getListCategoryController));
/**
 * Description. get all category
 * path: /get-all-category
 * mothod: get
 */
novelRouter.get('/get-previous-chapter', (0, handler_1.wrap)(Novels_Controller_1.getPreviousChapterController));
/**
 * Description. get previous chapter
 * path: /get-previout-chapter
 * mothod: get
 */
novelRouter.get('/get-next-chapter', (0, handler_1.wrap)(Novels_Controller_1.getNextChapterController));
/**
 * Description. get next chapter
 * path: /get-next-chapter
 * mothod: get
 */
novelRouter.patch('/update-episodes', (0, handler_1.wrap)(Novels_Controller_1.updateEpisodesController));
exports.default = novelRouter;
