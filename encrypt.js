const {encrypt} = require('./index');

process.stdin.on('data', data => {
    console.log(encrypt(data.toString('utf8')));

    process.exit(0)
});
