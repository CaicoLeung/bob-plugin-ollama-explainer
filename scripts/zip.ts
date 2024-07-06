import AdmZip from "adm-zip";
import hex from "./appcast";
import path from "node:path";

export async function zip(filename: string) {
  const homedir = process.cwd();
  const admZip = new AdmZip();
  const outDir = path.join(homedir, "dist");
  admZip.addLocalFolder(outDir);
  admZip.writeZip(`${outDir}/${filename}`, async () => {
    console.log(filename + " hash256: " + (await hex(filename)));
  });
}
