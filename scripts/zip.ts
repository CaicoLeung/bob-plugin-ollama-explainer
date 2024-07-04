import AdmZip from "adm-zip";
import hex from "./appcast";

const homedir = process.cwd();
const admZip = new AdmZip();
admZip.addLocalFolder(homedir + "/dist");
admZip.writeZip(homedir + "/dist/bob-plugin-ollama-explainer.bobplugin", async () => {
  console.log("bob-plugin-ollama-explainer.bobplugin created");
  console.log("hash256: " + (await hex("bob-plugin-ollama-explainer.bobplugin")));
  // TODO
});
