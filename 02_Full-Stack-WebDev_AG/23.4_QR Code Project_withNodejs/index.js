/* 
inquirer: https://www.npmjs.com/package/qr-image
qr-img: https://www.npmjs.com/package/qr-image
fs: https://nodejs.org/docs/latest-v18.x/api/fs.html#fswritefilefile-data-options-callback

1. Use the inquirer npm package to get user input.
    - inquirer pakcage 初学解释：https://www.educative.io/answers/how-to-use-the-inquirer-node-package
*/


import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
    .prompt([
        {
            'name': 'urlAsk',
            'type': 'input',
            'message': 'Give me your URL: '
        }
    ])

    .then((answers) => {
        console.log('User Answer:', answers); // 输出供调试: User Answer: { urlAsk: 'www.xxx.com' }
        const url = answers.urlAsk;

        // 2. Use the qr-image npm package to turn the user entered URL into a QR code image --using qr-image generator package
        var qr_svg = qr.image(url, { type: 'png' });
        qr_svg.pipe(fs.createWriteStream('url_qr.png')); // fs module to write：.createWriteStream('...')创建写入流，创建i_love_qr.svg空文件，打开盖子准备接受数据；用 .pipe() 的方式，数据是边生成、边传输、边写入的 --这就是一根水管。你把水管的一头接在水龙头（qr_svg）上，另一头接在水桶（文件）上。它的好处是，水（数据）流出来多少，它就传过去多少，自动管理，不会溢出。

        // 3. Create a txt file to save the user input using the native fs node module.
        fs.writeFile('urlText.txt', url, (err) => {
            if (err) throw err;
            console.log('The typed url text has been saved!');
        });

    })

    .catch((error) => {
        if (error.isTtyError) {
            console.log("Prompt couldn't be rendered in the current environment");
        } else {
            console.log('Something else went wrong')
            console.error(error); // 输出 error 以便调试; i.e. ReferenceError: require is not defined, at file://...
        }
    });


