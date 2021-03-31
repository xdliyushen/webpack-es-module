const fs = require('fs');
const path = require('path');
const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');

// 获取编译后的脚本名称
const fileList = fs.readdirSync(path.join(__dirname, '../public/'));
const es5js = fileList.filter(name => name.match(/^\w*.es5.js$/))?.[0] || null;
const es6js = fileList.filter(name => name.match(/^\w*.mjs$/))?.[0] || null;

// 填充 template
Metalsmith(path.join(__dirname, '../public/index.html'))
    .clean(false)
    .source(path.join(__dirname, '../template'))
    .destination(path.join(__dirname, '../public'))
    .metadata({
        // todo 修改 删除 localhost
        es5js: `http://localhost:8001/${es5js}`,
        // todo 修改 删除 localhost
        es6js: `http://localhost:8001/${es6js}`,
    })
    .use((files, metalsmith, done) => {
        const meta = metalsmith.metadata();

        Object.keys(files).forEach((fileName) => {
            const fileList = files;
            const t = files[fileName].contents.toString();
            fileList[fileName].contents = Buffer.from(Handlebars.compile(t)(meta));
        });
        done();
    })
    .build(function(err) {
        if (err) throw err;
    });