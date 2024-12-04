const fs = require('fs');
const readline = require('readline');


const inputFiles = [
  'file1.txt',
  'file2.txt',
  'file3.txt',
  'file4.txt',
  'file5.txt',
  'file6.txt',
  'file7.txt',
  'file8.txt',
  'file9.txt',
  'file10.txt',
];


const outputFile = 'output.txt';


async function copyFiles() {
  try {
    
    fs.writeFileSync(outputFile, '', 'utf8');

    for (let i = 0; i < inputFiles.length; i++) {
      const fileName = inputFiles[i];
      const numLinesToCopy = i + 1; 

      if (!fs.existsSync(fileName)) {
        console.log(`File ${fileName} does not exist, skipping.`);
        continue;
      }

      const fileStream = fs.createReadStream(fileName);
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      let lineCount = 0;
      for await (const line of rl) {
        if (lineCount >= numLinesToCopy) break;
        fs.appendFileSync(outputFile, line + '\n', 'utf8');
        lineCount++;
      }

      rl.close();
    }

    console.log(`Files' contents successfully copied to ${outputFile}`);
  } catch (error) {
    console.error(`Error while copying files: ${error.message}`);
  }
}


copyFiles();
