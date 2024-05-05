"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_Controller_1 = require("../controllers/Users.Controller");
const users_middlewares_1 = require("../middlewares/users.middlewares");
const handler_1 = require("../utils/handler");
const validation_1 = require("../utils/validation");
const usersRoute = (0, express_1.Router)();
/**
 * Description. login a new user
 * path: /login
 * mothod: POST
 * Body:{password:string,email:string}
 */
usersRoute.post('/login', (0, validation_1.validate)(users_middlewares_1.loginValidator), (0, handler_1.wrap)(Users_Controller_1.loginController));
/**
 * Description. Regitster a new user
 * path: /regitster
 * mothod: POST
 * Body:{name:string,password:string,email:string,date_of_birth:ISO8601
 * ,confirm_password:string}
 */
usersRoute.post('/register', (0, validation_1.validate)(users_middlewares_1.regitsterValidator), (0, handler_1.wrap)(Users_Controller_1.regitsterController));
/**
 * Description. logout a  user
 * path: /logout
 * mothod: POST
 * Header:{Authorization:Bearer <access_token>}
 * Body:{refresh_token:string}
 */
usersRoute.post('/logout', (0, validation_1.validate)(users_middlewares_1.accessTokenValidator), (0, handler_1.wrap)(Users_Controller_1.logoutController));
/**
 * Description. verify user
 * path: /verify
 * mothod: POST
 * Body:{email_verify_token:string}
 */
usersRoute.post('/follow-novel', (0, validation_1.validate)(users_middlewares_1.accessTokenValidator), (0, handler_1.wrap)(Users_Controller_1.followNovelController));
/**
 * Description. follow the novel
 * path: /follow-novel
 * mothod: POST
 * Body:{novelId:string}
 * Header:{Authorization:Bearer <access_token>}
 */
usersRoute.post('/unfollow-novel', (0, validation_1.validate)(users_middlewares_1.accessTokenValidator), (0, handler_1.wrap)(Users_Controller_1.unFollowNovelController));
/**
 * Description. follow the novel
 * path: /follow-novel
 * mothod: POST
 * Body:{novelId:string}
 * Header:{Authorization:Bearer <access_token>}
 */
usersRoute.get('/get-me', (0, validation_1.validate)(users_middlewares_1.accessTokenValidator), (0, handler_1.wrap)(Users_Controller_1.getMeController));
/**
 * Description. get user profile
 * path: /:username
 * mothod: GET
 * Body:{username}
 */
exports.default = usersRoute;
