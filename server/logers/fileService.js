const { mkdir, writeFile, appendFile } = require("fs/promises");
const FS = require("fs");
const chalk = require("chalk");

const createFile = async (day, morganString) => {
  try {
    const URL = `${__dirname}/logs`;
    const DAY = `${URL}/${day}.log`;

    let isExcise = FS.existsSync(URL);

    if (!isExcise) await mkdir(URL);
    const isFileExcise = FS.existsSync(DAY);
    if (!isFileExcise) await writeFile(DAY, `${morganString}\n`);
    else await appendFile(DAY, morganString);
  } catch (error) {
    console.log(chalk.redBright(`error create file :${error.message}`));
  }
};

exports.createFile = createFile;
