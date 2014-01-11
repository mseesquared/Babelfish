import simplejson
import urllib2
import urllib
import web
from microsofttranslator import Translator

urls = (
        '/trans/(.*)', 'translate'
        )

app = web.application(urls, globals())

class translate:
    def GET(self, name):
        translator = Translator('translatewinterhack', 'm5z06/zsCyf2mtdXfVbc2pvCSDO1wF5S1VB6cDauLIE=')
        if not name:
            name = "World"
        return simplejson.dumps(translator.translate(name, "es"))

if __name__ == "__main__":
    app.run();
