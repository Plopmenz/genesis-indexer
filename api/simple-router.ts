import { Express, Response } from "express";

import { Storage } from "..";
import { replacer } from "../utils/json";

function malformedRequest(res: Response, error: string): void {
  res.statusCode = 400;
  res.end(error);
}

export function registerRoutes(app: Express, storage: Storage) {
  const basePath = "/indexer/";

  // Gets a single contribution
  app.get(basePath + "contribution/:contributionIndex", async function (req, res) {
    const contributionIndex = parseInt(req.params.contributionIndex);
    if (Number.isNaN(contributionIndex)) {
      return malformedRequest(res, "contributionIndex is not a valid number");
    }

    const contributions = await storage.contributions.get();
    const contribution = contributions.at(contributionIndex);
    if (!contribution) {
      res.statusCode = 404;
      return res.end("Contribution not found");
    }

    res.end(JSON.stringify(contribution, replacer));
  });

  // Gets the total number of verified contributors
  app.get(basePath + "totalContributions", async function (req, res) {
    const contributions = await storage.contributions.get();
    const totalContributions = contributions.length;

    res.end(JSON.stringify({ totalContributions: totalContributions }, replacer));
  });
}
