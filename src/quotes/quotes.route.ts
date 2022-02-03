import express from "express";

import QuotesController from "./quotes.controller";
import md_auth from "../middleware/authenticated";
import { alterQuote } from "../middleware/alterTables";

const api = express.Router();

api.get("/quotes", [md_auth], QuotesController.quotes);
api.get("/quote/:id", QuotesController.getQuote);
api.post("/create-quote", [md_auth], QuotesController.createQuote);
api.delete("/quote/:id", [md_auth, alterQuote], QuotesController.deleteQuote);
api.put("/quote/:id", [md_auth, alterQuote], QuotesController.updateQuote);

export default api;
