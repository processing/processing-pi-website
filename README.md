# Processing for Pi website builder

This repository contains theme and content for Processing for Pi website. The website is built with [Hugo static site generator](https://gohugo.io) that makes use of templates, content types and themes in order to make publishing easier.

## Content of the website

The content of the website resides in folder `content` in the form of Markdown files. When the site is re-built with Hugo, the markdown gets converted into HTML pages.

## How to build this site on your machine

In order to be able to re-build the site using code in this repository, you'd need two things installed:

- Hugo
- Gulp

Please follow this guide to install Hugo: https://gohugo.io/getting-started/quick-start/

Please follow this guide to install Gulp **globally**: https://github.com/gulpjs/gulp/blob/v3.9.1/docs/getting-started.md 

## Development Process

After Hugo and Gulp are installed, you should be able to build the website by issuing this command:

```
hugo server -D
```

Hugo should launch a server on your localhost's port 1313 and you should be able to navigate to the website in the browser at the following URL: http://localhost:1313/


### Adding new content

To add new content, you can just drop a new Markdown file into `content` directory depending on what kind of page you want to add.

- For top level pages that should appear in the side menu, put the file in the root of `content` folder
- For adding tutorials, put the file in `tutorial` folder

Currently the tutorials are not going to appear in any menus until they are complete.

After the content is added, you can add it to the menu by modifying `config.toml` file in the root of the code repository. Please look at the existing menu items there.

### Changing stylesheets or Javascript

The SCSS files and JS for the website live in `themes/processing/src` folder.

Please install all required packages before trying to modify JS or SCSS files:

```sh
cd themes/processing/src
npm install
```

If you change any JS or SCSS files, you'd need to rebuild the files by using Gulp:  

```sh
gulp
```

When the JS or SASS files are changed, please rebuild the site with Hugo by running `hugo server` or `hugo` commands

To modify CSS and JS and see the results in real time (using LiveReload), you'd need to launch two terminals, start Hugo server and then activate the CSS / JS file watching process by issue the following commands:

Terminal 1:
```sh
hugo server -D
```

Terminal 2:
```sh
cd themes/processing/src
gulp dev
```

At this point, the changes in SASS or JS files in `themes/processing/src` folder should be reflected on the local Hugo server at `localhost:1313` almost immediately

### Publishing the site

When you are done adding new content and are ready to re-generate the HTML of the site, issue this command:

```sh
hugo
```

It should update all files within `docs` folder that could be then uploaded to the static site hosting service.
