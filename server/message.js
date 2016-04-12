// Send normal message
function sendTextMessage(sender, text) {
  messageData = {
    text: text
  };

  HTTP.post("https://graph.facebook.com/v2.6/me/messages", {
    params: {
      access_token: token
    },
    data: {
      recipient: {
        id: sender
      },
      message: messageData
    }
  }, function(error, result) {
    if (error) {
      console.log("POST request failed.", error);
    } else {
      console.log("Message sent");
    }
  });
}

// Send generic, pre-defined message
function sendGenericMessage(sender) {
  messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "Oculus Rift",
            "subtitle": "The latest VR technology in store",
            "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
            "buttons": [
              {
                "type": "web_url",
                "url": "https://www.oculus.com/en-us/",
                "title": "Visit Store"
              }, {
                "type": "postback",
                "title": "Postback",
                "payload": "Payload for first element in a generic bubble",
              }
            ],
          },{
            "title": "Samsung Gear VR",
            "subtitle": "Available with the new Samsung phone",
            "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
            "buttons": [
              {
                "type": "postback",
                "title": "Postback",
                "payload": "Payload for second element in a generic bubble",
              }
            ],
          }
        ]
      }
    }
  };

  HTTP.post("https://graph.facebook.com/v2.6/me/messages", {
    params: {
      access_token: token
    },
    data: {
      recipient: {
        id: sender
      },
      message: messageData
    }
  }, function(error, result) {
    if (error) {
      console.log("POST request failed.", error);
    } else {
      console.log("Generic message sent");
    }
  });
}