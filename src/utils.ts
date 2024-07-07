import { SystemPrompt } from "./constants";
import { Query } from "./types";

export function generatePrompt(query: Query) {
  const promptTemplate = $option.prompt || SystemPrompt;
  return parseStringTemplate(promptTemplate, {
    sourceLang: query.detectFrom,
    targetLang: query.detectTo,
    sourceText: query.text,
  });
}

export function currentModel() {
  return $option.model === "custom" && $option.customModel ? $option.customModel : $option.model;
}

/**
 * Replaces all occurrences of placeholders in a string template with their corresponding values from a data object.
 *
 * @param {string} template - The string template with placeholders to be replaced.
 * @param {Record<string, string>} data - The data object containing the values for the placeholders.
 * @return {string} - The string template with the placeholders replaced by their corresponding values.
 */
export const parseStringTemplate = (template: string, data: Record<string, string>) => {
  return template.replace(/\{[^}]*\}/g, function (m) {
    const key = m.replace(/\{|\}/g, "");
    return data.hasOwnProperty(key) ? data[key] : "";
  });
};
