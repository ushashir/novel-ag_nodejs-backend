"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTokens = exports.updateUser = exports.findUniqueUser = exports.findUser = exports.createUser = exports.excludedFields = void 0;
const client_1 = require("@prisma/client");
const lodash_1 = require("lodash");
const config_1 = __importDefault(require("config"));
const connectRedis_1 = __importDefault(require("../utils/connectRedis"));
const jwt_1 = require("../utils/jwt");
exports.excludedFields = [
    "password",
    "verified",
    "verificationCode",
    "passwordResetAt",
    "passwordResetToken",
];
const prisma = new client_1.PrismaClient();
const createUser = async (input) => {
    return (await prisma.agent.create({
        data: input,
    }));
};
exports.createUser = createUser;
const findUser = async (where, select) => {
    return (await prisma.agent.findFirst({
        where,
        select,
    }));
};
exports.findUser = findUser;
const findUniqueUser = async (where, select) => {
    return (await prisma.agent.findUnique({
        where,
        select,
    }));
};
exports.findUniqueUser = findUniqueUser;
const updateUser = async (where, data, select) => {
    return (await prisma.agent.update({ where, data, select }));
};
exports.updateUser = updateUser;
const signTokens = async (user) => {
    // 1. Create Session
    connectRedis_1.default.set(`${user.id}`, JSON.stringify((0, lodash_1.omit)(user, exports.excludedFields)), {
        EX: config_1.default.get('redisCacheExpiresIn') * 60,
    });
    // 2. Create Access and Refresh tokens
    const access_token = (0, jwt_1.signJwt)({ sub: user.id }, 'accessTokenPrivateKey', {
        expiresIn: `${config_1.default.get('accessTokenExpiresIn')}m`,
    });
    const refresh_token = (0, jwt_1.signJwt)({ sub: user.id }, 'refreshTokenPrivateKey', {
        expiresIn: `${config_1.default.get('refreshTokenExpiresIn')}m`,
    });
    return { access_token, refresh_token };
};
exports.signTokens = signTokens;
//# sourceMappingURL=agent.services.js.map