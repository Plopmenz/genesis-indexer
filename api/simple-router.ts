import { Express, Response } from "express";

import { Storage } from "..";
import { replacer } from "../utils/json";

function malformedRequest(res: Response, error: string): void {
  res.statusCode = 400;
  res.end(error);
}

export function registerRoutes(app: Express, storage: Storage) {
  const basePath = "/indexer/";

  // Gets a single mint
  app.get(basePath + "mint/:mintIndex", async function (req, res) {
    const mintIndex = parseInt(req.params.mintIndex);
    if (Number.isNaN(mintIndex)) {
      return malformedRequest(res, "mintIndex is not a valid number");
    }

    const mints = await storage.mints.get();
    const mint = mints.at(mintIndex);
    if (!mint) {
      res.statusCode = 404;
      return res.end("Mint not found");
    }

    res.end(JSON.stringify(mint, replacer));
  });

  // Gets the total number of mints
  app.get(basePath + "totalMint", async function (req, res) {
    const mints = await storage.mints.get();
    const totalMints = mints.length;

    res.end(JSON.stringify({ totalMints: totalMints }, replacer));
  });
}
