import { zip } from "./zip";
import infoJson from "../src/info.json";
import { appcast } from "./appcast";
import chalk from "chalk";

(async () => {
  try {
    const filename = `${infoJson.identifier}.bobplugin`;
    await zip(filename);
    await appcast(filename);
  } catch (error) {
    console.error(chalk.red(error));
  }
})();
