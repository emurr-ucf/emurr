import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var stat = fs.statSync("./websites/test.html");

  res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': stat.size
  });

  var readStream = fs.createReadStream("./websites/test.html");
  // We replaced all the event handlers with a simple call to readStream.pipe()
  readStream.pipe(res);

}
