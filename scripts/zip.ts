import AdmZip from "adm-zip";

const homedir = process.cwd();
const admZip = new AdmZip();
admZip.addLocalFolder(homedir + "/dist");
admZip.writeZip(homedir + "/dist/bob-plugin-ollama-explainer.bobplugin");
