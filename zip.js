const fs = require("fs");
const path = require("path");
const JSZip = require("jszip");

const templatesFolder = "templates";
const srcFolder = path.join(__dirname, "src");
const outDir = path.join(__dirname, "templates");

if(!fs.existsSync(outDir)){
    fs.mkdirSync(outDir);
}

var zip = new JSZip();

var folders = fs.readdirSync(srcFolder);

for(let i = 0; i < folders.length; i++) {
    const folderTozip = path.join(srcFolder, folders[i]);
    const finalZipOutput = path.join(outDir, `${folders[i]}.zip`);
    if (fs.existsSync(finalZipOutput)){
        fs.rmdirSync(finalZipOutput);
    }
    var zippedFolder = zip.folder(folderTozip);
    zippedFolder.generateNodeStream({type:"nodebuffer", streamFiles: "true"})
    .pipe(fs.createWriteStream(finalZipOutput))
    .on('finish', () => {
        console.log(`${finalZipOutput} has been created`);
    });
}