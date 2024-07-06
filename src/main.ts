import { SupportLanguages } from "./lang";
import { LLama3Response, Query } from "./types";

let buffer = "";

function translate(query: Query) {
  const { text, detectTo, detectFrom } = query;
  try {
    const params = {
      stream: true,
      model: "llama3",
      prompt: `You are a translation engine, translate from ${detectFrom} to ${detectTo} directly without explanation and any explanatory content.\n
      ${text}
      `,
    };
    $log.info(`Prompt: ${params.prompt}`);
    $http.streamRequest<LLama3Response>({
      method: "POST",
      url: "http://localhost:11434/api/generate",
      timeout: 80,
      cancelSignal: query.cancelSignal,
      header: {
        "Content-Type": "application/json",
      },
      body: params,
      streamHandler(stream) {
        $log.info(`Response: ${stream.text}`);
        const result = JSON.parse(stream.text) as LLama3Response;
        buffer += result.response;
      },
      handler() {
        $log.info(`buffer: ${buffer}`);
        query.onCompletion({
          result: {
            from: query.detectFrom,
            to: query.detectTo,
            toParagraphs: [buffer],
          },
        });
        buffer = "";
      },
    });
  } catch (error: any) {
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
