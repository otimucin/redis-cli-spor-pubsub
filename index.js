var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require("redis");
var redisClient = redis.createClient(32768);

app.use(express.static(__dirname + '/node_modules'));  

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

var clients = [];

redisClient.subscribe("ozgun");
jsonObj = { "Id":10587092,
      "TournamentId":1950,
      "SportId":1,
      "DateOfMatch":"2017-04-15T17:00:00",
      "HomeTeam":{  
         "Id":53841,
         "Name":"FK Makedonija Gjorge Petrov"
      },
      "AwayTeam":{  
         "Id":136548,
         "Name":"Shkupi Skopje"
      },
      "HomeTeamScore":0,
      "AwayTeamScore":0,
      "HomeTeamRedCardCount":0,
      "AwayTeamRedCardCount":0,
      "StatusCodeId":100,
      "StatusCodeDetail":"Bitti",
      "IsMatchActive":false,
      "Minutes":90,
      "IsMinutesPlus":false,
      "ScoreStatus":"MS"}
redisClient.on("message", function(channel, message) {
    for(i = 0; i < clients.length; i++){
       let client = clients[i];
   
        client.emit("broad",JSON.stringify(jsonObj));
    }    
});

io.on('connection', function(client) {  
   clients.push(client);
});

server.listen(6200);  