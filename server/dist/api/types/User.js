"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class User {
    static users = [];
    static nextId = 1;
    static async create(userName, password) {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = {
            id: this.nextId,
            userName,
            password: hashedPassword
        };
        this.users.push(newUser);
        this.nextId++;
        return newUser;
    }
    static async findAll() {
        return this.users;
    }
    static async findByPk(id) {
        return this.users.find(user => user.id === id);
    }
    static async findOne(userName) {
        return this.users.find(user => user.userName === userName);
    }
    static async validatePassword(userName, password) {
        const user = await this.findOne(userName);
        if (!user)
            return false;
        return bcrypt_1.default.compare(password, user.password);
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map