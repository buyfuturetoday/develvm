Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Github-api.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


```
# List public gists
curl -i -X GET https://api.github.com/gists/public

# List my gists
curl -i -X GET https://api.github.com/users/colmsjo/gists

# Get the contents of a public Gist
curl -i -X GET https://api.github.com/gists/3684023

# Get the rate limit, the limit is 5000 per hour. This is keyed off either your login, your OAuth token, or request IP
curl -i -X GET https://api.github.com/rate_limit

```

## Gist comments

API for comments: http://developer.github.com/v3/gists/comments/

```
# Get the comments for a Gist
curl -i -X GET https://api.github.com/gists/3684138/comments
```

## Pagination

Requests that return multiple items will be paginated to 30 items by default.


```
# Get the two first public Gists, see the response header for a link to the next page
curl -i -X GET https://api.github.com/gists/public?per_page=2
...
Status: 200 OK
Link: <https://api.github.com/gists/public?page=2&per_page=2>; rel="next", <https://api.github.com/gists/public?page=398043&per_page=2>; rel="last"
X-GitHub-Media-Type: github.beta
...
```

```
# Get the next page
curl -i -X GET "https://api.github.com/gists/public?page=2&per_page=2"
```

