var express = require('express');
var uuid = require('node-uuid'),
    multiparty = require('multiparty'),
    fs = require('fs');
    path = require("path");

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.json();
});

router.post('/uploadImage', function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        var file = files.file[0];
        var contentType = file.headers['content-type'];
        var tmpPath = file.path;
        var extIndex = tmpPath.lastIndexOf('.');
        var extension = (extIndex < 0) ? '.png' : tmpPath.substr(extIndex);
        // uuid is for generating unique filenames.
        var fileName = uuid.v4() + extension;
        console.log(__dirname);
        var destPath = path.join(__dirname, '../client/img/uploads/' + fileName);

        // Server side file type checker.
        if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
            fs.unlink(tmpPath);
            return res.status(400).send('Unsupported file type.');
        }

        fs.rename(tmpPath, destPath, function (err) {
            if (err) {
                console.log(err);
                return res.status(401).send('Image is not saved:' + err);
            }
            destPath = destPath.replace('/home/bosone/WebstormProjects/expotest', '');
            return res.json(destPath);
        });
    });
});

router.post('/uploadPDF', function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        var file = files.file[0];
        var contentType = file.headers['content-type'];
        var tmpPath = file.path;
        var extIndex = tmpPath.lastIndexOf('.');
        var extension = (extIndex < 0) ? '.pdf' : tmpPath.substr(extIndex);
        // uuid is for generating unique filenames.
        var fileName = uuid.v4() + extension;
        console.log(__dirname);
        var destPath = path.join(__dirname, '../client/img/pdf/' + fileName);

        // Server side file type checker.
        if (contentType !== 'application/pdf') {
            fs.unlink(tmpPath);
            return res.status(400).send('Unsupported file type.');
        }

        fs.rename(tmpPath, destPath, function (err) {
            if (err) {
                console.log(err);
                return res.status(401).send('Image is not saved:' + err);
            }
            console.log(destPath);
            destPath = destPath.replace('C:\\Users\\serikuly_s\\WebstormProjects\\expotest\\expotest\\client\\img\\pdf\\', '');
            return res.json(destPath);
        });
    });
});

module.exports = router;
