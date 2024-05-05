"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChaptersController = exports.deleteNovelsController = exports.updateChapterController = exports.updateNovelController = exports.addChapterOfNovelController = exports.addNovelController = void 0;
const Admin_services_1 = require("../services/Admin.services");
const addNovelController = async (req, res, next) => {
    const result = await Admin_services_1.adminServices.addNovel(req.body);
    res.send(result);
};
exports.addNovelController = addNovelController;
const addChapterOfNovelController = async (req, res, next) => {
    const result = await Admin_services_1.adminServices.addChapterbyNovelId(req.body);
    res.send(result);
};
exports.addChapterOfNovelController = addChapterOfNovelController;
const updateNovelController = async (req, res, next) => {
    const result = await Admin_services_1.adminServices.updateNovel(req.body);
    res.send(result);
};
exports.updateNovelController = updateNovelController;
const updateChapterController = async (req, res, next) => {
    const result = await Admin_services_1.adminServices.updateChapter(req.body);
    res.send(result);
};
exports.updateChapterController = updateChapterController;
const deleteNovelsController = async (req, res, next) => {
    const result = await Admin_services_1.adminServices.deleteNovel(req.body);
    res.send(result);
};
exports.deleteNovelsController = deleteNovelsController;
const deleteChaptersController = async (req, res, next) => {
    const result = await Admin_services_1.adminServices.deleteChapter(req.body);
    res.send(result);
};
exports.deleteChaptersController = deleteChaptersController;
