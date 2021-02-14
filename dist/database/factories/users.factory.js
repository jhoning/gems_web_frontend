"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_seeding_1 = require("typeorm-seeding");
var users_entity_1 = __importDefault(require("../entities/users.entity"));
typeorm_seeding_1.define(users_entity_1.default, function (faker) {
    var email = faker.internet.email();
    var user = new users_entity_1.default();
    user.email = email;
    user.password = '123456';
    return user;
});
