---
layout: post
description: Giving docpad a spin
title: Giving docpad a spin
date: 2013-07-12
author: Jonas Colmsjo
tags: ['post']
---

Giving docpad a spin





docpad as a new content management system based on static files. This removes the need for a databse and makes it possible to store the content in git (or any version control system tou prefer).

Links:

 * http://docpad.org/


## Hello world in docpad

First install NodeJS and npm if you haven't already. 

Latest version when this is written is installed like this: `npm install -g docpad@6.45`.

Copied from here: http://docpad.org/docs/start

```
mkdir docpad-site && cd docpad-site

docpad init

npm install --save docpad-plugin-eco docpad-plugin-marked

mkdir -p src/documents/posts/
```


src/layouts/default.html.eco:

```
<html>
<head>
    <title><%= @document.title %></title>
    <%- @getBlock("meta").toHTML() %>
    <%- @getBlock("styles").toHTML() %>
</head>
<body>
    <%- @content %>
    <%- @getBlock("scripts").toHTML() %>
</body>
</html>
```


src/layouts/post.html.eco:

```
---
layout: default
---
<h1><%= @document.title %></h1>
<div><%- @content %></div>
```


src/documents/posts/hello.html.md:

```
---
layout: post
description: Hello World!
title: Hello World!
---
**Hello** World!
```

src/documents/index.html.eco:

```
<% for post in @getFilesAtPath("posts").toJSON(): %>
    <a href="<%= post.url %>"><%= post.title %></a><br/>
<% end %>

```

Generate the site

```
docpad run
```

open http://localhost:9778/

Add one more post:

src/documents/posts/world.html.md:

```
---
layout: post
description: Hello World!
title: Hello World!
---
Hello **World!**

```













