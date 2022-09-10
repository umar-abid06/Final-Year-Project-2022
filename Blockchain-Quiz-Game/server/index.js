const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const fs = require('fs');

app.get("/get", (req, res) => {
   
    const directoryPath = path.join(__dirname, '../public/images');

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        console.log(files)
      
        res.json({ file: files[0] })
    });

});
app.get("/delete", (req, res) => {
    
    const directoryPath = path.join(__dirname, '../public/images');
    fs.readdir(directoryPath, function (err, files) {
       
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        fs.unlink(directoryPath + '/' + files[0], function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            res.json({ msg: 'File deleted!' });
        })
    });

});




app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});