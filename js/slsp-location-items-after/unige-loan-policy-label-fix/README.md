# Remove item policy codes from public display

Item loan policies defined in SLSP are prefixed by a numerical code, which is included in the policy information
displayed to the public. For example, the loan policy can look like

```
14 Prêt 28 jours, pas d'expédition, pas de reproduction
```

However, the numerical code (here: 14) doesn't contain useful information for end users and can be confusing.

This module removes such numerical codes from the public display.

Binding directive: `slsp-location-items-after`

## Usage

### Enable the module

To enable this module, copy it inside your view's Javascript folder, import it into your `main.js` and add `unigeLoanPolicyLabelFix` to the list of 
declared modules.

Following our network practice, at UNIGE we try to keep this folder organized by the directives to which modules are bound, but you don't have to.
Accordingly, enabling modules is done in a two-step process:

In `slsp-location-items-after/index.js`:

```JavaScript
require('./unige-loan-policy-label-fix/unige-loan-policy-label-fix.module.js')
module.exports = 'unigeLoanPolicyLabelFix'

```

In `main.js`:

```JavaScript
import './slsp-location-items-after';

var app = angular.module('viewCustom', [(...), 'unigeLoanPolicyLabelFix']);

```

Alternatively, you can also directly require the module file in your `main.js` (adjust the path to the module accordingly):

```JavaScript
require('./slsp-location-items-after/unige-loan-policy-label-fix/unige-loan-policy-label-fix.module.js')

var app = angular.module('viewCustom', [(...), 'unigeLoanPolicyLabelFix']);

```

### Dependencies

There are no dependencies for this module.

## Known issues

No known issues at this time.

## Changelog

* 2023-10-03 [TG] Added extra check to only remove numerical codes.
* 2023-09-18 [TG] Released module for internal testing.
