## About
ŌūJs is simple wrapper, extensions and shorthands for Vanilla JS. It uses really short method name to make code quicker. ŌūJS contains common HTMLElement shorthands and other commonly used funcitons in day-to-dat routine work.
## Install
<code>npm install oujs</code>
<code>bower install oujs</code>
## Why?
Today pure JavaScript sometimes also called Vanilla JS. Is pretty powerful enough and you don't need 3rd-party libraries like [jQuery](http://www.jquery.com). Usually 3rd-party libraries are overbloated and fat and people don't use 80% of it's power in everyproject. Today everything can be achieved with pure JavaScript. But native method names and object chains are really long, as the result code is also very long. This is why I deciced to create ŌūJs.
## What is Ōū?
Ōū (pronounced [ˈʔoːʔuː]) is small Hawaiian bird (Psittirostra psittacea) it is small and beautiful as well as ŌūJS. [Wikipedia](https://en.wikipedia.org/wiki/%CA%BB%C5%8C%CA%BB%C5%AB)
## Method naming convention
The idea was to create methods names as short as possible. Methods consist of 2 parts: method and object. One char is used for method and 3 chars are used element.
### Table of shortenings
| Short | Long |
|-------|------|
| g     | get  |
| h     | has  |
| a     | add  |
| r     | remove  |
| t     | toggle  |
| cls   | class |
| atr   | attribute |
| elm   | element|
| al    | all |
### Examples
**gatr** (**g** - stands for get, **atr** for attribute, means short version of getAttribute)<br>
**gal** (**g** - stands for get, **al** for all, shortening of getAll)<br>
**tcls** (**t** - toggle, **cls** class = toggleClass)<br>
**aatr** (**a** - add, **atr** attribute = addAttribute)<br>
## API
| method | Vanilla JS equivalent |
|-------|------|
| Ou.g(selector) | document.querySelector() |
| Ou.gal(selector) | document.querySelectorAll() |
| Ou.relm() | document.remove()* |
| Element.aatr(name, value) | Element.setAttribute() |
| Element.gatr(name) | Element.getAttribute() |
| Element.ratr(name) | Element.removeAttribute() |
| Element.hatr(name) | Element.hasAttribute() |
| Element.acls(name1, name2, ..., nameN) | Element.classList.add() |
| Element.rcls(name1, name2, ..., nameN) | Element.classList.remove() |
| Element.tcls(name) | Element.classList.toggle() |
| Element.hcls(name) | Element.classList.contains() |
| Ou.ajax(params) | AJAX call made for backwards compatibiliy. For AJAX calls it's strongly recommended to use native JS **fetch()** funtion. See AJAX params below |
*IE11 has workaround
#### AJAX params
| Parameter | type | default |
|-------|------|------|
| url | string | '' |
| url | method | 'GET' |
| success | function | function (xhr) {} |
| error | function | function (xhr) {} |
| async | boolean | true |
| data | object | {} |
| user | string | null |
| pwd | string | null |
| type | string | 'html' |
| file | binaryBlob | null |
| cors | string | false |

[Project's webpage](http://www.whoop.ee/oujs/)