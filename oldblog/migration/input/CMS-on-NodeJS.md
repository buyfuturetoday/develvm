Alternatives:
 * Wheat - takes markdown files from git, by Tim Caswell - https://github.com/creationix/wheat
  * Used by howtonode.org
  * Works fine (after changing the port to a free port)
 * Scotch - similar to Jekyll but without build
  * Redis caching
  * uses Geddy
  * not stable according to author - https://github.com/techwraith/scotch
 * Blacksmith - by Nodejitsu - http://blog.nodejitsu.com/introducing-blacksmith
  * Was unable to make this work. Rendering the unit tests gave empty results (I created an issue)
  * UPDATE: My issue was answered. It worked fine after updating nodejs and cloning blacksmith once more.
 * Calipso - seams to have high ambitions, not sure how mature it is yet
  * traditional CMS, uses MongoDB
  * Been around some time so uses old approach, not building static pages based on markdown etc.
 * GeddyJS - http://geddyjs.org/faq
  * More framework than a CMS
 * Basic blog - https://github.com/hij1nx/blog
  * Works fine (after changing to a free port)

Some notes:
 * Scotch and Blacksmith generates static HTML which is good
 * Wheat and Basic blog requires a server running which is bad
 * Scotch is not stable according to the author and requires a Redis instance for caching which is bad
 * Calipso is more of a traditional CMS which is bad in this case

Geddy and Calipso are ranked high by Nodecloud (based on web site traffic).

CONCLUSION: I'm going forward with blacksmith. Mainly because static html files are generated and no application server or database is needed.

Articles:
 * http://siliconangle.com/blog/2012/02/03/5-content-management-or-blog-publishing-systems-written-in-node-js/
 * Listing of Node resoruces, CMS and others - http://www.nodecloud.org/

