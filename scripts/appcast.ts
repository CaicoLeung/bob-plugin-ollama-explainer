import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs";

export default function hex(file: string) {
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
      return reject(err);
    });
  });
}
