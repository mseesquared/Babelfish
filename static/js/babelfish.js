(function(){
  if (annyang) {

    var listenSound = new Audio("aud/listen.mp3");
    var startSound = new Audio("aud/start.mp3");
    var stopSound = new Audio("aud/stop.mp3");

    var currLang = null;
    var supportedLangs = [
      "spanish"
    ];
    var langAbbrevs = {
      "spanish": "es-US"
    };

    var listenForOrders = function() {
      listenSound.play();
      annyang.addCommands(orderCommands);
    };

    var startTranslating = function(lang) {
      lang = lang.toLowerCase();
      if (supportedLangs.indexOf(lang) !== -1) {
        startSound.play();
        currLang = lang;
        annyang.removeCommands(orderPhrases);
        annyang.addCommands(translateCommands);
      }
    };

    var stopTranslating = function() {
      stopSound.play();
      currLang = null;
      annyang.removeCommands(orderPhrases);
      annyang.removeCommands(translatePhrases);
    };

    var translateAndSpeak = function(line) {
      annyang.removeCommands(translatePhrases);
      var route = "../trans/" + line;
      $.get(route, function(data) {
        var ssu = new SpeechSynthesisUtterance(data);
        ssu.lang = langAbbrevs[currLang];
        speechSynthesis.speak(ssu);
        annyang.addCommands(translateCommands);
      });
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
})();