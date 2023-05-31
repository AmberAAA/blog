#!/bin/zsh

npm run build
scp -r ./build/ root@anborong.top:~/blog/
#open http://blog.anborong.top
