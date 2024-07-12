import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs";
import infoJson from "../src/info.json";
import appcastJson from "../appcast.json";
import inquirer from "inquirer";
import chalk from "chalk";

interface AppcastVersion {
  version: string;
  desc: string;
  sha256: string;
  url: string;
  minBobVersion: string;
  timestamp: number;
}

export default function hex(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const dist = path.join(process.cwd(), "dist");
    const pluginPath = path.join(dist, file);

    const sha256 = crypto.createHash("sha256");

    const fileStream = fs.createReadStream(pluginPath);

    fileStream.on("data", (chunk) => {
      sha256.update(chunk);
    });

    fileStream.on("end", () => {
      const hashedData = sha256.digest("hex");
      return resolve(hashedData);
    });

    fileStream.on("error", (err) => {
      return reject(err.message);
    });
  });
}

export async function appcast(filename: string) {
  const version = infoJson.version;
  const zipHash = await hex(filename);

  inquirer
    .prompt([
      {
        type: "input",
        name: "version",
        message: `Current version: ${version}. Enter new version:`,
      },
      {
        type: "input",
        name: "desc",
        message: "Enter this version description:",
      },
      {
        type: "confirm",
        name: "confirm",
        message: "Are you sure?",
        choices: ["confirm", "cancel"],
      },
    ])
    .then((answers: any) => {
      if (answers.confirm) {
        const downloadUrl = `${infoJson.homepage}/releases/download/${answers.version}/bob-plugin-ollama-translator.bobplugin`;
        const appcastVersion: AppcastVersion = {
          version: answers.version,
          desc: answers.desc,
          sha256: zipHash,
          url: downloadUrl,
          minBobVersion: infoJson.minBobVersion,
          timestamp: Date.now(),
        };
        console.log(chalk.green("Appcast Version:"));
        console.log(chalk.blue(JSON.stringify(appcastVersion, null, 2)));
        const appcast = {
          identifier: infoJson.identifier,
          version: answers.version,
          versions: [...appcastJson.versions, appcastVersion],
        };
        const info = {
          ...infoJson,
          version: answers.version,
        };
        const appcastPath = path.join(process.cwd(), "appcast.json");
        fs.writeFileSync(appcastPath, JSON.stringify(appcast, null, 2));
        const infoPath = path.join(process.cwd(), "src", "info.json");
        fs.writeFileSync(infoPath, JSON.stringify(info, null, 2));
      } else {
        console.log(chalk.red("Aborted"));
      }
    });
}
