import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  if (process.env.NODE_ENV == 'development') {
    process.env.FACEBOOK_OAUTH = Meteor.settings.private.FACEBOOK_OAUTH;
  }

  // Subscribe app to Facebook Page
  HTTP.post("https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=" + process.env.FACEBOOK_OAUTH, {}, function(error, result) {
    if (error) {
      console.log("POST request failed.", error);
    } else {
      console.log("App subscribed to Facebook Page.");
    }
  });
});