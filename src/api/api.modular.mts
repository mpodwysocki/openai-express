import { AzureKeyCredential } from "@azure/openai";
import { createOpenAI, listChatCompletions } from "@azure/openai/api";
import express from "express";

export const apiRouter = express.Router();

apiRouter.post("/", async (req, res) => {
  const messages = req.body;
  if (!messages) {
    res.status(400).send("Missing messages JSON body");
    return;
  }

  const endpoint = process.env["AZURE_OPENAI_ENDPOINT"]!;
  const azureApiKey = process.env["AZURE_OPENAI_API_KEY"]!;
  const deployment = process.env["AZURE_OPENAI_DEPLOYMENT"]!;

  const context = createOpenAI(endpoint, new AzureKeyCredential(azureApiKey));
  try {
    const completions = listChatCompletions(
      context,
      messages,
      deployment,
    );

    res.setHeader("cache-control", "no-cache");
    res.setHeader("content-type", "text/event-stream");
    res.status(200);

    for await (const completion of completions) {
      for (const choice of completion.choices) {
        const canWrite = res.write(choice.delta?.content ?? "");
        if (!canWrite) {
          await new Promise((resolve) => res.once("drain", resolve));
        }
      }
    }

    res.end();
  } catch(err) {
    res.status(500).send(`Error: ${err}`);
  }
});
