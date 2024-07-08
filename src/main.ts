import { SupportLanguages } from "./lang";
import { OllamaResponse, Query } from "./types";
import { currentModel, generatePrompt } from "./utils";

let buffer = "";

function translate(query: Query) {
  try {
    const model = currentModel();
    const prompt = generatePrompt(query);
    const params = {
      stream: true,
      model: model,
      prompt: prompt,
    };

    $http.streamRequest<OllamaResponse>({
      method: "POST",
      url: "http://localhost:11434/api/generate",
      timeout: 80,
      cancelSignal: query.cancelSignal,
      header: {
        "Content-Type": "application/json",
      },
      body: params,
      streamHandler(stream) {
        const result = JSON.parse(stream.text) as OllamaResponse;

        if (!result.done) {
          buffer += result.response;
          query.onStream({
            result: {
              from: query.detectFrom,
              to: query.detectTo,
              toParagraphs: [buffer],
            },
          });
        } else {
          query.onCompletion({
            result: {
              from: query.detectFrom,
              to: query.detectTo,
              toParagraphs: [buffer],
            },
          });
        }
      },
      handler() {
        buffer = "";
      },
    });
  } catch (error: any) {
    $log.error(error);
    query.onCompletion({ error: error });
  }
}

function supportLanguages() {
  return SupportLanguages.map((item) => item[0]);
}

function pluginTimeoutInterval() {
  return 60;
}

export { translate, supportLanguages, pluginTimeoutInterval };
