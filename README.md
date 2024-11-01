# Running the Website

Simply using `file:///` is not going to work on some browsers (e.g. Chrome) because it will not allow the JS Fetch API (required to read files).

Run `./run.sh` to run the website.

### Manually running

Start a python web server (port 8080 is used below)

```
$ python3 -m http.server 8080
```

and go to [`http://localhost:8080/home.html`](http://localhost:8080/home.html) in your browser (use incognito if making any updates to avoid browser cache)
