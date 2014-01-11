import json
import urllib2
import urllib

transurl = "https://www.googleapis.com/language/translate/v2/detect"
transurl += "?q="
transurl += urllib.quote("el vida del amor")
transurl += "&key=AIzaSyD2A3vcvZ5rot4iBrxFG7Vup5bdI8AgQOM"
print transurl
print json.load(urllib2.urlopen(transurl))
