---
layout: page
title: Blog
---

{% assign blog_posts = site.posts | where_exp: "post", "post.categories contains 'blog'" | where_exp: "post", "post.hidden != true" %}
<div>
  {% for post in blog_posts %}
  <h1><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h1>
  <time datetime="{{ post.date | date_to_xmlschema }}" class="post-date">{{ post.date | date: "%B %e, %Y" }}</time>
  <p class="lead">{{ post.lead }}</p>
  {% endfor %}
</div>
