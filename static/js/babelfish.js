(function(){
  if (annyang) {

    var listenSound = new Audio("aud/listen.mp3");
    var startSound = new Audio("aud/start.mp3");
    var stopSound = new Audio("aud/stop.mp3");

    var currLang = null;
    var supportedLangs = [
      "english",
      "spanish",
//      "french",
//      "german",
      "chinese"
//      "dutch",
//      "catalan",
//      "czech",
//      "finnish",
//      "polish",
//      "russian"
    ];
    var langAbbrevs = {
      "english": "lang-en-US",
      "spanish": "lang-es-US",
//      "french": "fr-FR",
//      "german": "de-DE",
      "chinese": "lang-cmn-Hans-CN"
//      "dutch": "nl-NL",
//      "catalan": "ca-ES",
//      "czech": "cs-CZ",
//      "finnish": "fi-FI",
//      "polish": "pl-PL",
//      "russian": "ru-RU"
    };

    var listenForOrders = function() {
      listenSound.play();
      currLang = null;
      annyang.removeCommands(translatePhrases);
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
      var route = "../trans/" + currLang + "/" + line;
      $.get(route, function(data) {
        console.log(currLang);
        console.log(data);
        data = data.replace(/\u([a-f0-9]{4})/gi, function (n, hex) {
          return String.fromCharCode(parseInt(hex, 16));
        });
        data = data.replace(/\\/gi, "");
        console.log(data);
        var ssu = new SpeechSynthesisUtterance();
        console.log("here we go 1");
        ssu.text = data;
        console.log("here we go 2");
        voices = window.speechSynthesis.getVoices();
        ssu.voiceURI = "native";
        ssu.voice = voices[10];
        console.log("here we go 3");
        ssu.onend = function(){ 
          console.log("Done!");
          annyang.addCommands(translateCommands); 
        };
        ssu.onerror = function(error) {
          console.log(error);
          annyang.addCommands(translateCommands); 
        }
        ssu.onstart = function() {
          console.log("Starting speech...");
        }
        ssu.lang = langAbbrevs[currLang];
        console.log("here we go 4");
        console.log(ssu);
        speechSynthesis.speak(ssu);
      });
    };

    var testCommands = {
      "*line": function(line) {
        console.log(line);
      }
    }
    var triggerCommands = { "babelfish": listenForOrders };

    var orderPhrases = [
      "speak *language",
      "stop translating"
    ];
    var orderCommands = {
      "speak *language": startTranslating,
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
