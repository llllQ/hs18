$(function() {

  //get user location

  var userLat = 0;
  var userLong = 0;
  navigator.geolocation.getCurrentPosition(function(position){
    userLat = position.coords.latitude;
    userLon = position.coords.longitude;
    });
    console.log('user lat at definition: '+userLat);


  // Get handle to the chat div
  var $chatWindow = $('#messages');

  // Our interface to the Chat service
  var chatClient;

  // A handle to the "general" chat channel - the one and only channel we
  // will have in this sample app
  var generalChannel;

  //array of channel objects
  // var arrChannel = [{channelName: 'channel0', lat: '', long:''}];
  // var arrChannel = ['a','b','c'];
  var sussChannel;

  var vpnChannel;

  // var myArray = [50.86, 5];

  // var userLat = myArray[Math.floor(Math.random()* myArray.length)];


  // The server will assign the client a random username - store that value
  // here
  var username;

  // Helper function to print info messages to the chat window
  function print(infoMessage, asHtml) {
    var $msg = $('<div class="info">');
    if (asHtml) {
      $msg.html(infoMessage);
    } else {
      $msg.text(infoMessage);
    }
    $chatWindow.append($msg);
  }

  // Helper function to print chat message to the chat window
  function printMessage(fromUser, message) {
    var $user = $('<span class="username">').text(fromUser + ':');
    if (fromUser === username) {
      $user.addClass('me');
    }
    var $message = $('<span class="message">').text(message);
    var $container = $('<div class="message-container">');
    $container.append($user).append($message);
    $chatWindow.append($container);
    $chatWindow.scrollTop($chatWindow[0].scrollHeight);
  }

  // Alert the user they have been assigned a random username
  print('Connecting...');

  // Get an access token for the current user, passing a username (identity)
  // and a device ID - for browser-based apps, we'll always just use the
  // value "browser"
  $.getJSON('/token', {
    device: 'browser'
  }, function(data) {
    // Alert the user they have been assigned a random username
    username = data.identity;
    print('You have been assigned a random username of: '
    + '<span class="me">' + username + '</span>', true);

    // Initialize the Chat client
    Twilio.Chat.Client.create(data.token).then(client => {
      chatClient = client;
      chatClient.getSubscribedChannels().then(createOrJoinGeneralChannel);
    });
  });

  function createOrJoinGeneralChannel() {
    //new version coded by the boys
    print('Attempting to find hotboys in your area...')
    console.log('user latitude: '+ userLat);
    alert(userLat);
    if (userLat >50.5 ){
      chatClient.getChannelByUniqueName('sussex')
      .then(function(channel){
        sussChannel = channel;
        console.log('Found Sussex Channel');
        console.log(sussChannel);
        setupSussChannel();
      }).catch(function(){
        // Creating chatroom as no current one open
      console.log('Creating channel for location latitude: '+userLat+', longitude: '+userLong);
      chatClient.createChannel({
        uniqueName: 'sussex',
        friendlyName: 'Falmer Drink Buddy Chat Channel'
      }).then(function(channel) {
        console.log('Created Falmer channel:');
        console.log(channel);
        sussChannel = channel;
        setupSussChannel();
        print('Created a Chat Group for your Area')
      }).catch(function(channel) {
        console.log('Channel could not be created:');
        console.log(channel);
      });
      });
    }else{
      chatClient.getChannelByUniqueName('vpn')
      .then(function(channel){
        sussChannel = channel;
        console.log('Found London Channel');
        console.log(vpnChannel);
        setupVpnChannel();
      }).catch(function(){
        // Creating chatroom as no current one open
      console.log('Creating channel for location latitude: '+userLat+', longitude: '+userLong);
      chatClient.createChannel({
        uniqueName: 'vpn',
        friendlyName: 'London Drink Buddy Chat Channel'
      }).then(function(channel) {
        console.log('Created London channel:');
        console.log(channel);
        sussChannel = channel;
        setupChannel();
      }).catch(function(channel) {
        console.log('Channel could not be created:');
        console.log(channel);
      });
      });
    }
    

    //new version coded by the boys


    // Get the general chat channel, which is where all the messages are
    // sent in this simple application
  //   print('Attempting to join "general" chat channel...');
  //   chatClient.getChannelByUniqueName('general')
  //   .then(function(channel) {
  //     generalChannel = channel;
  //     console.log('Found general channel:');
  //     console.log(generalChannel);
  //     setupChannel();
  //   }).catch(function() {
  //     // If it doesn't exist, let's create it
  //     console.log('Creating general channel');
  //     chatClient.createChannel({
  //       uniqueName: 'general',
  //       friendlyName: 'General Chat Channel'
  //     }).then(function(channel) {
  //       console.log('Created general channel:');
  //       console.log(channel);
  //       generalChannel = channel;
  //       setupChannel();
  //     }).catch(function(channel) {
  //       console.log('Channel could not be created:');
  //       console.log(channel);
  //     });
  //   });
  }

  // Set up channel after it has been found
  function setupSussChannel() {
    // Join the general channel
    sussChannel.join().then(function(channel) {
      // print('Joined channel as '
      // + '<span class="me">' + username + '</span>.', true);
      print('Joined Local Sussex ChatRoom');
    });

    // Listen for new messages sent to the channel
    sussChannel.on('messageAdded', function(message) {
      printMessage(message.author, message.body);
    });
  }

  function setupVpnChannel() {
    // Join the general channel
    vpnChannel.join().then(function(channel) {
      // print('Joined channel as '
      // + '<span class="me">' + username + '</span>.', true);
      print('Joined Local Chatroom');
    });

    // Listen for new messages sent to the channel
    vpnChannel.on('messageAdded', function(message) {
      printMessage(message.author, message.body);
    });
  }

  // Send a new message to the general channel
  var $input = $('#chat-input');
  $input.on('keydown', function(e) {
    if (e.keyCode == 13) {
      generalChannel.sendMessage($input.val())
      $input.val('');
    }
  });
});
