# the func

_Desktop app that allows you to read functions across multiple files in one single view - without switching tabs._

### Background

This project is inspired by [code bubbles](http://cs.brown.edu/~spr/codebubbles/), an Eclipse plugin that allowed programmers to define and use groups of functions.

This type of interface makes reading code easy, specially in cases where you're jumping into a brand new project.

### Introduction

the func's UI approach is different from code bubbles. It does not use a _canvas_, as it is not a particular effective approach when dealing with low resolution screens.

For the moment, the application is capable of scanning js files (it ignores certain things, like the node_module folder), generating a directory tree and allows the user to search detected functions.

![directory tree](https://raw.githubusercontent.com/luisdlopez/thefunc/master/docs/01-thefunc.gif)

The look and feel is far from final, and tests have not been written yet. It's all coming though. 

### Development

This app uses the following tools:

- Electron
- Vue.js
- Vuex
- Esprima 
- js-beautify
- Ace editor
- Font Awesome
- Semantic UI

The whole project structure is based on [electron-boilerplate-vue](https://github.com/bradstewart/electron-boilerplate-vue)
