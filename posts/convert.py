import markdown2
import os
for dirName, subdirList, fileList in os.walk('posts/html/'):
    for fname in fileList:
        os.remove(dirName + fname)
tem = open('posts/post.template.html', 'r', encoding='utf-8').read()
for dirName, subdirList, fileList in os.walk('posts/md/'):
    for fname in fileList:
        mdcont = str(markdown2.markdown_path(dirName + fname))
        htmlcont = tem
        htmlcont = htmlcont.replace('$-=contents=-$', mdcont)
        htmlcont = htmlcont.replace('$-=title=-$', fname.split('.')[0])
        htmlfile = open('posts/html/' + fname.split('.')[0] + '.html', 'w', encoding='utf-8')
        htmlfile.write(htmlcont)
