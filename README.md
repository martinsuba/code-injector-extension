[![Build Status](https://travis-ci.org/martinsuba/code-injector-extension.svg?branch=master)](https://travis-ci.org/martinsuba/code-injector-extension)

# code-injector-extension

Chrome extension for JS & CSS code injection into the specified websites. Contains tab UI for code management written in [React](https://reactjs.org/). App is using [Redux](https://redux.js.org/) for state management and stores state in chrome extension storage.

## Features

:heavy_check_mark: injects JS and CSS code into website specified by domain match<br>
:heavy_check_mark: supports jQuery v3.4.1<br>
:heavy_check_mark: tab UI for script management<br>
:heavy_check_mark: simple code editor with JS/CSS text highlight

## Build
```
git clone https://github.com/martinsuba/code-injector-extension
cd code-injector-extension/ui && npm i
cd ../extension && npm i && npm run build:production
```

## Screenshot
![Code Injector screenshot](/screenshot.png?raw=true "Code Injector screenshot")
