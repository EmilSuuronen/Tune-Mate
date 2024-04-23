"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require('path');
const app = (0, express_1.default)();
// Serve static files from the React app
app.use(express_1.default.static(path.join(__dirname, '../../client/build')));
// Handle React routing, return all requests to React app
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=app.js.map