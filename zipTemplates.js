const fs = require("fs-extra");
const path = require("path");
const archiver = require('archiver');

const srcFolder = path.join(__dirname, "src/Templates");
const snippetsSrcFolder = path.join(__dirname, "src/Snippets");
const outDir = path.join(__dirname, "Visual Studio 2019", "Templates", "ItemTemplates", "Visual C#");
const codeSnippetsOutdir = path.join(__dirname, "Visual Studio 2019", "Code Snippets", "Visual C#", "My Code Snippets");
const absOutFolder = path.join(__dirname, "Visual Studio 2019");
const absOutfile = path.join(__dirname, "DOTSTemplates.zip");

if (!fs.existsSync(codeSnippetsOutdir)) {
    fs.mkdirSync(codeSnippetsOutdir, {
        recursive: true
    });
}

var snippetFiles = fs.readdirSync(snippetsSrcFolder);
for (let i = 0; i < snippetFiles.length; i++) {
    var sourceFile = path.join(snippetsSrcFolder, snippetFiles[i]);
    var destFile = path.join(codeSnippetsOutdir, snippetFiles[i]);
    fs.copyFileSync(sourceFile, destFile);
}

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {
        recursive: true
    });
}

var folders = fs.readdirSync(srcFolder);
for (let i = 0; i < folders.length; i++) {
    const folderTozip = path.join(srcFolder, folders[i]);
    const finalZipOutput = path.join(outDir, `${folders[i]}.zip`);

    if (fs.existsSync(finalZipOutput)) {
        try {
            fs.removeSync(finalZipOutput);
        } catch (error) {
            console.log(`Could not delete file ${finalZipOutput}. Skipping file deletion.`);
            console.log(`Error details: ${error}`);
        }
    }

    const archive = archiver('zip', {zlib: {level: 9}});
    const output = fs.createWriteStream(finalZipOutput);
    output.on('close', function() {
        console.log(archive.pointer() + ' total bytes');
        console.log('Archiving finalized.');
    });
    archive.pipe(output);
    archive.directory(folderTozip, false);
    archive.finalize();
}

if (fs.existsSync(absOutfile)) {
    try {
        fs.removeSync(absOutfile);
    } catch (error) {
        console.log(`Could not delete file ${absOutfile}. Skipping file deletion.`);
        console.log(`Error details: ${error}`);
    }
}

const output = fs.createWriteStream(absOutfile);
const archive = archiver('zip', {zlib: {level: 9}});
output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('Archiving finalized.');
});
archive.pipe(output);
archive.directory(absOutFolder, false);
archive.finalize();