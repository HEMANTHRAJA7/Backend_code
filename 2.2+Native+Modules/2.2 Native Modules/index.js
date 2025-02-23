const fs = require("fs");

fs.writeFile("message1.txt","hello I am using NodeJS",(err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  }); 

//to perform one comment out the other


fs.readFile('./message1.txt',"utf8" , (err, data) => {
    if (err) throw err;
    console.log(data);
  }); 
