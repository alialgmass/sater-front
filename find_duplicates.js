const fs = require('fs');

function findDuplicates(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const keys = {};
    const duplicates = [];

    lines.forEach((line, i) => {
        const match = line.match(/"(.*?)"\s*:/);
        if (match) {
            const key = match[1];
            if (keys[key]) {
                duplicates.push({ key, line: i + 1, firstSeen: keys[key] });
            }
            keys[key] = i + 1;
        }
    });

    return duplicates;
}

console.log('AR.JSON duplicates:');
console.log(JSON.stringify(findDuplicates('d:/Projects/sater-front/locales/ar.json'), null, 2));

console.log('EN.JSON duplicates:');
console.log(JSON.stringify(findDuplicates('d:/Projects/sater-front/locales/en.json'), null, 2));
