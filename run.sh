#!/bin/bash

python3 -m http.server 8080 | open -na '/Applications/Google Chrome.app/' --args --incognito 'http://localhost:8080/home.html'
