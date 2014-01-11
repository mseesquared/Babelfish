(function(){
  if (annyang) {

    var listenSound = new Audio("/aud/listen.mp3");
    var startSound = new Audio("/aud/start.mp3");
    var stopSound = new Audio("/aud/stop.mp3");

    var listenForCommand = function() {
      listenSound.play();
      annyang.addCommands(listenCommands);
    };

    var startTranslating = function(language) {
      startSound.play();
      console.log(language);
    };

    var stopTranslating = function() {
      cancelSound.play();
      annyang.removeCommands(listenWords);
    };

    var triggerWord = "babelfish";
    var triggerCommands = { "babelfish": listenForCommand };

    var listenWords = [
      "start translating to *language",
      "stop translating"
    ];
    var listenCommands = {
      "start translating to *language": startTranslating,
      "stop translating": stopTranslating
    };
    
    annyang.init(triggerCommands);
    annyang.start();

  }
})();