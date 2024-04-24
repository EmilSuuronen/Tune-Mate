"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const fetchData = async (url, options = {}) => {
    // console.log('fetching data from url: ', url);
    const response = await fetch(url, options);
    const json = await response.json();
    if (!response.ok) {
        const errorJson = json;
        console.log('throwing error', errorJson.message, response.statusText.toUpperCase());
        throw new graphql_1.GraphQLError(errorJson.message || `${response.statusText} occured`, {
            extensions: {
                code: response.statusText.toUpperCase(),
                http: {
                    status: response.status,
                },
            },
        });
    }
    return json;
};
exports.default = fetchData;
//# sourceMappingURL=fetchData.js.map