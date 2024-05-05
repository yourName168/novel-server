"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handler_1 = require("../utils/handler");
const Admin_Controllers_1 = require("../controllers/Admin.Controllers");
const adminRouter = (0, express_1.Router)();
adminRouter.post('/add-novel', (0, handler_1.wrap)(Admin_Controllers_1.addNovelController));
/**
 * Description. add a new novel to Database
 * path: /add-novel
 * mothod: POST
 * Body:{authorName:string,image:URL,name:string,category:object}
 */
adminRouter.post('/add-chapter-in-novel', (0, handler_1.wrap)(Admin_Controllers_1.addChapterOfNovelController));
/**
 * Description. add a new chapter to novel
 * path: /add-chapter-in-novel
 * mothod: POST
 * Body:{novelId:string,chapterName:string,chapterContent:string,chapterIndex:number}
 */
adminRouter.patch('/update-novel', (0, handler_1.wrap)(Admin_Controllers_1.updateNovelController));
/**
 * Description. update novel
 * path: /update-novel
 * mothod: PATCH
 * Body:{novelId:string,authorName:string,image:URL,name:string,category:object}
 */
adminRouter.patch('/update-chapter', (0, handler_1.wrap)(Admin_Controllers_1.updateChapterController));
/**
 * Description. update chapter
 * path: /update-chapter
 * mothod: PATCH
 * Body:{novelId:string,chapterId:string,chapterName:string,chapterContent:string,chapterIndex:number}
 */
adminRouter.delete('/delete-novel', (0, handler_1.wrap)(Admin_Controllers_1.updateNovelController));
/**
 * Description. delete novel
 * path: /delete-novel
 * mothod: DELETE
 * Body:{novelId:string}
 */
adminRouter.delete('/delete-chapter', (0, handler_1.wrap)(Admin_Controllers_1.updateChapterController));
/**
 * Description. delete chapter
 * path: /delete-chapter
 * mothod: DELETE
 * Body:{novelId:string,chapterId:string}
 *
 */
exports.default = adminRouter;
