import markdown2
import os
tem = open('./post.template.html', 'r').read()
for dirName, subdirList, fileList in os.walk('./md/'):
    for fname in fileList:
        mdcont = str(markdown2.markdown_path(dirName + fname))
        htmlcont = tem
        htmlcont = htmlcont.replace('$-=contents=-$', mdcont)
        htmlcont = htmlcont.replace('$-=title=-$', fname.split('.')[0])
        htmlfile = open('./html/' + fname.split('.')[0] + '.html', 'w')
        htmlfile.write(htmlcont)