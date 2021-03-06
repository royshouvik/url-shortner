# URL Shortener Microservice
A URL shortner microservice built using Node and Express. User can pass a URL as a parameter and get back a shortened URL in JSON response.

## User Stories
- [x]  I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

- [x] If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

- [x] When I visit that shortened URL, it will redirect me to my original link.


## Example creation usage:
`https://url-y.gomix.me/new/https://www.google.com`

`https://url-y.gomix.me/new/http://foo.com:80`

## Example creation output
```
{ 
"original_url":"http://foo.com:80",
"short_url":"https://url-y.gomix.me/abcd"
}
```
## Usage:
`https://url-y.gomix.me/abcd`
Will redirect to:
`http://foo.com:80`

Built by `@royshouvik` for [FreeCodeCamp](https://www.freecodecamp.com/challenges/url-shortener-microservice)
