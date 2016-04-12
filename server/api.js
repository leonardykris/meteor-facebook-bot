// Global API Configuration
var Api = new Restivus({
  apiPath: 'api/', // https://yoursite.com/api/routes-to-add/
  useDefaultAuth: true,
  prettyJson: true
});

// Add the 'webhook' route
Api.addRoute('webhook', {authRequired: false}, {
  // Define GET
  get: {
    action: function () {
      // Check the verify token, it has to match with the one you set earlier
      if (this.queryParams['hub.verify_token'] === "na_na_na_na_batman") {
        // The response needs to be a number
        return Number(this.queryParams['hub.challenge']);
      }
      // If the token is wrong, then return something else
      return "kryptonite_is_the_answer";
    }
  },
  // Define POST
  post: {
    action: function() {
      // Declare message event
      messaging_events = this.bodyParams.entry[0].messaging;

      for (i = 0; i < messaging_events.length; i++) {
        event = this.bodyParams.entry[0].messaging[i];
        sender = event.sender.id;

        // If message exists
        if (event.message && event.message.text) {
          text = event.message.text;

          // Check message content
          if (text === 'Generic') {
            // Send generic message (the one with Oculus)
            sendGenericMessage(sender);
          } else {
            // Send back a response
            // Use this one to echo a text
            // sendTextMessage(sender, text.substring(0, 200));
            sendTextMessage(sender, "Hello there, how may I help you today?");
          }
        }
      }
      // Status code: success
      return 200;
    }
  }
});