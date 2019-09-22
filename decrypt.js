const {decrypt} = require('./index');

process.stdin.on('data', data => {
    console.log(decrypt(data.toString('utf8')));

    process.exit(0)
});
