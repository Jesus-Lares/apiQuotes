import express from "express";

import ShuffleController from "./shuffle.controller";

const api = express.Router();

api.get("/apiQuotes/:id", ShuffleController.getShuffleQuote);

export default api;
