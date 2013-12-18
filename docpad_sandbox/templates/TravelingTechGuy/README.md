# [Meny](https://github.com/hakimel/Meny) skeleton for [DocPad](https://github.com/bevry/docpad)
Build a simple site/blog with a 3D transition menu. Utilizes [DocPad HTML5Boilerplate skeleton](https://github.com/docpad/html5-boilerplate.docpad) as a start point.

See th online demo [on Heroku](http://meny.herokuapp.com/).


## Getting Started

1. [Install DocPad](https://github.com/bevry/docpad)

1. Clone the project and run the server

	``` bash
	git clone git://github.com/TravelingTechGuy/Meny.docpad.git
	cd Meny.docpad
	npm install
	docpad run
	```

2. [Open http://localhost:9778/](http://localhost:9778/)


## Changing the contents

1. Start hacking away by modifying the `src` directory
	1. The [src/files/layouts/default.html.eco](https://github.com/TravelingTechGuy/Meny.docpad/blob/master/src/layouts/default.html.eco) controls the 2 sections of the page:
		1. `meny` - the menu area
		2. `contents` - the page contents, further divided into:
			1. `header` - can be provided on site/document level
			2. `article` - provided on the page level (e.g. [src/documents/index.html.md](https://github.com/TravelingTechGuy/Meny.docpad/blob/master/src/documents/index.html.md))
			3. `footer` - can be provided on site/document level
	2. The menu is built from [src/files/layouts/menu.json](https://github.com/TravelingTechGuy/Meny.docpad/blob/master/src/layouts/menu.json), where you can select:
		1. `title` - the title at the head of the menu
		2. `name` - name of the menu item
		3. `class` - if you want it different the item from the other items (leave empty otherwise)
		4. `url` - the URL it points to
		5. `newPage` - Whether to open the URL in a blank page (deafult: false)
2. Check out the [Meny repository](https://github.com/hakimel/Meny) to futher control the Meny look-and-feel.

See [LICENSE.md](https://github.com/TravelingTechGuy/Meny.docpad/blob/master/LICENSE.md) file for full license info.