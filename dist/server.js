"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const _port = process.env.PORT || 3000;
app.use(express_1.default.static(path.join(__dirname, '../public')));
app.listen(_port, () => {
    console.info(`Server is up on port ${_port}`);
});
//# sourceMappingURL=server.js.map