"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var type_graphql_1 = require("type-graphql");
var projects_model_1 = __importDefault(require("./projects.model"));
var User = (function () {
    function User() {
    }
    User.prototype.nombre_completo = function () {
        return this.first_name.replace(/^./, this.first_name[0].toUpperCase()) + " " + this.last_name.replace(/^./, this.last_name[0].toUpperCase());
    };
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.ID; }),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        __metadata("design:type", String)
    ], User.prototype, "first_name", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        __metadata("design:type", String)
    ], User.prototype, "last_name", void 0);
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.GraphQLISODateTime; }, { nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "created_at", void 0);
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.GraphQLISODateTime; }, { nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "updated_at", void 0);
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.GraphQLISODateTime; }, { nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "deleted_at", void 0);
    __decorate([
        type_graphql_1.Field(function () { return [projects_model_1.default]; }, { nullable: true }),
        __metadata("design:type", Array)
    ], User.prototype, "projects", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", String)
    ], User.prototype, "nombre_completo", null);
    User = __decorate([
        type_graphql_1.ObjectType({ description: 'User Model' })
    ], User);
    return User;
}());
exports.default = User;
