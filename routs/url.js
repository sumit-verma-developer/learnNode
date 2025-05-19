const express = require("express");
const { handleGenerateNewShortURL, handleGetAnalytics } = require("../controllers/url");

const utlRouter = express.Router();

utlRouter.post("/", handleGenerateNewShortURL);
utlRouter.get('/analytics/:shortId',handleGetAnalytics)


module.exports = utlRouter;
