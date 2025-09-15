
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');

// Set up the view engine and middlewares
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Create an HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = socketIo(server);

app.get('/xyz',(req,res)=>{
res.render("admin");
});



app.get('/',(req,res)=>{
res.render("public");
});

io.on('connection', (socket) => {
console.log('A user connected:', socket.id);

socket.on("imgo",async (imgdata)=>{
await console.log("come up"+typeof(imgdata)+ imgdata.length);
await io.emit("himg",imgdata);
});



socket.on("location",async (locdata)=>{
await  console.log(locdata);
await  io.emit("loc",locdata);
});

socket.on("disconnect",()=>{
console.log('A user disconnected:', socket.id);
});
});

server.listen(3000);
