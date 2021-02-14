"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_seeding_1 = require("typeorm-seeding");
var projects_entity_1 = __importDefault(require("../entities/projects.entity"));
typeorm_seeding_1.define(projects_entity_1.default, function (faker) {
    var name = faker.name.jobTitle();
    var project = new projects_entity_1.default();
    project.name = name;
    return project;
});
