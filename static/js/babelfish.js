(function(){
  if (annyang) {

    var listenSound = new Audio("aud/listen.mp3");
    var startSound = new Audio("aud/start.mp3");
    var stopSound = new Audio("aud/stop.mp3");
    var speech = new SpeechSynthesisUtterance();

    var supportedLangs = [
      "spanish"
    ]

    var listenForOrders = function() {
      listenSound.play();
      annyang.addCommands(orderCommands);
    };

    var startTranslating = function(lang) {
      lang = lang.toLowerCase();
      console.log(lang);
      if (supportedLangs.indexOf(lang) !== -1) {
        startSound.play();
        annyang.removeCommands(orderPhrases);
        annyang.addCommands(translateCommands);
      }
    };

    var stopTranslating = function() {
      stopSound.play();
      annyang.removeCommands(orderPhrases);
      annyang.removeCommands(translatePhrases);
    };

    var translateAndSpeak = function(line) {
      var route = "../trans/" + line;
      console.log(route)
      $.get(route, function(data) {
        console.log("Got here!");
        speech.text = data;
        speech.lang = 'es';
        speechSynthesis.speak(speech);
      });
    }

    var testCommand = {
      "*line": function(line) {
        console.log(line);
      }
    };
    var triggerCommands = { "babelfish": listenForOrders };

    var orderPhrases = [
      "start translating to *language",
      "stop translating"
    ];
    var orderCommands = {
      "start translating to *language": startTranslating,
      "stop translating": stopTranslating
    };

    var translatePhrases = [ "*line" ];
    var translateCommands = {
      "*line": translateAndSpeak
    };
    
    annyang.init(triggerCommands);
    annyang.start();

  }
  else console.log("Fucked up!");
})();