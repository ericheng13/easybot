var HTTPS = require('https');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /(.| )(E|e)(as(y|ie(r|st))|(z|Z))/;
      botRegexHard = /(.| )(H|h)(ard|ARD)/;
      botRegexDifficult = /(| )(D|d)(ifficult|IFFICULT)/;
    var easyResponses = [ "so easy", "too easy", "way too easy", "the easiest",
      "not hard. really", "so god damn easy", "I'll show you easy!",
      "piece of cake", "E. Z.", "never been easier", "SO. EASY.",
      "not as easy as your waifu.. kya!~"];
    var hardResponses = [ "Please..", "So easy",
      "Try harder. It's probably so easy.",
      "Yeah, you wish it was hard ( ͡° ͜ʖ ͡°)", "kys", "Not that hard",
      "don't be a lil bitch. that shit so EZ", "suck it up", "( ͡° ͜ʖ ͡°)"];



  if(request.text && botRegex.test(request.text) && (request.name != "ez") && (request.name != "Cancer") && (request.name.toUpperCase() != "GroupMe".toUpperCase())) {
    this.res.writeHead(200);
    postMessage(easyResponses[getRandomInt(0, easyResponses.length)]);
    this.res.end();
  } else if(request.text && (botRegexHard.test(request.text) || botRegexDifficult.test(request.text)) && (request.name != "ez") && (request.name != "Cancer") && (request.name.toUpperCase() != "GroupMe".toUpperCase())) {
    this.res.writeHead(200);
    postMessage(hardResponses[getRandomInt(0, hardResponses.length)]);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse, options, body, botReq, easyResponses;


  botResponse = response;//"so easy";//cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
exports.respond = respond;
