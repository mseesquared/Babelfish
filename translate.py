import simplejson
import urllib2
import urllib
import web
from microsofttranslator import Translator

urls = (
    '/trans/(.*)', 'translate',
    '/', 'index'
)

lang_abbrevs = {
    'spanish': 'es'
}

app = web.application(urls, globals())

class translate:
    def GET(self, line):
        translator = Translator('translatewinterhack', 'm5z06/zsCyf2mtdXfVbc2pvCSDO1wF5S1VB6cDauLIE=')
        if not line:
            line = 'World'
        return simplejson.dumps(translator.translate(line, 'es'))

class index:
    def GET(self):
        raise web.seeother('/static/index.html')

if __name__ == '__main__':
    app.run()
