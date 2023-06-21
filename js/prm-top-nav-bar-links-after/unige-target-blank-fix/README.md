# Prevent custom main menu links from opening in a new window

Custom links added to the Primo main menu (links menu) are all assigned a `target="_blank"` attribute by default, opening them in a new window.
This is not always the desired behaviour, unfortunately there doesn't appear to be a way to control this behaviour.

This module attempts to replace all `target="_blank"` attributes from the links menu with `target="_self"`.

Binding directive: `prm-top-nav-bar-links-after`

## Usage

### Enable the module

To enable this module, copy it inside your view's Javascript folder, import it into your `main.js` and add `unigeTargetBlankFix` to the list of declared modules.

Following our network practice, at UNIGE we try to keep this folder organized by the directives to which modules are bound, but you don't have to.
Accordingly, enabling modules is done in a two-step process:

In `prm-top-nav-bar-links-after/index.js`:

```JavaScript
require('./unige-target-blank-fix/unige-target-blank-fix.module.js')
module.exports = 'unigeTargetBlankFix'

```

In `main.js`:

```JavaScript
import './prm-top-nav-bar-links-after';

var app = angular.module('viewCustom', [(...), 'unigeTargetBlankFix']);

```

Alternatively, you can also directly require the module file in your `main.js` (adjust the path to the module accordingly):

```JavaScript
require('./prm-top-nav-bar-links-after/unige-target-blank-fix/unige-target-blank-fix.module.js')

var app = angular.module('viewCustom', [(...), 'unigeTargetBlankFix']);

```

### Dependencies

This module has no external dependencies.

## Known issues

No known issues at this stage.

## Changelog

* 2023-06-21 [TG] Added second watcher to catch links in the overlay menu too.
* 2023-05-24 [TG] First version out for testing.
