import simplejson
import urllib2
import urllib
import web
from subprocess import call
from microsofttranslator import Translator

urls = (
    '/trans/(.*)/(.*)', 'translate',
    '/changevoice/(.*)', 'change_voice',
    '/', 'index'
)

lang_abbrevs = {
    "english": "en",
    "spanish": "es",
#    "french": "fr",
#    "german": "de",
    "chinese": "zh-CHS"
#    "dutch": "nl",
#    "catalan": "ca",
#    "czech": "cs",
#    "finnish": "fi",
#    "polish": "pl",
#    "russian": "ru"
}

lang_voices = {
    "english": "Alex",
    "spanish": "Javier",
    "chinese": "Ting-Ting"
}

app = web.application(urls, globals())

class translate:
    def GET(self, lang, line):
        translator = Translator('translatewinterhack', 'm5z06/zsCyf2mtdXfVbc2pvCSDO1wF5S1VB6cDauLIE=')
        if not line:
            line = 'World'
        return simplejson.dumps(translator.translate(line, lang_abbrevs[lang]))

class change_voice:
    def GET(self, lang):
        call(["./change_voice.sh", "--set-default", lang_voices[lang]])

class index:
    def GET(self):
        raise web.seeother('/static/index.html')

if __name__ == '__main__':
    app.run()
