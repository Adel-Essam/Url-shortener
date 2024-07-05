# URL Shortener App

Technologies used: Node.js, Express, MongoDB, EJS view engine.

## Idea

A URL shortener website is a service that converts long website addresses into shorter, more manageable links. Users input a lengthy URL, and the website generates a condensed version, making it easier to share and remember.

## Interface

The application interface consists of one page which contains:

- A form to shorten the URL, which takes two inputs:
  - the long version of the url
  - the alias of the url (defaults to a random string)
- A table which contains the previously shortened URLs.

## Short URLs

The short URLs are written in this form:

```
http://localhost:3000/{alias}
```
