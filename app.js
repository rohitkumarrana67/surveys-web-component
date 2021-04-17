const express = require('express');
const app = express()
const PORT = 4001;

app.use(express.static(__dirname + '/public'));

app.listen(PORT,()=>{
  console.log(`server is running on the port ${PORT}`)
})