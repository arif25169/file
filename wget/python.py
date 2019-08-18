import wget
import time
import threading
from bs4 import BeautifulSoup
import urllib.request
import re
f = open('foo.txt', 'r')
lines = f.readlines()
l=0
class MyThread(threading.Thread):
  def run(self):
    url = urllib.request.urlopen(links)
    content = url.read()
    soup = BeautifulSoup(content)
    for a in soup.findAll('a',href=re.compile('http.*\.zip')):
      if re.findall('http',a['href']):
        print ("URL:", a['href'])
        wget.download(a['href'])
        time.sleep(10)

for x in range(len(lines)):
  links = lines[l]
  l = l + 1
  MyThread().start()
  time.sleep(10)