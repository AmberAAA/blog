#!/bin/zsh

npm run build
scp -r ./dist/ root@anborong.top:~/blog/
#open http://blog.anborong.top
