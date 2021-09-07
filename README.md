# primo-explore-eth-metagrid

## Description

This Module integrates Metagrid into Primo VE.
It extracts the GND IDs (by default in lds03) and queries the Metagrid API with it.
With the whitelist (to be changed in the variable sourcesWhitelist) the result is filtered and the links sorted by person are inserted into the links section.

### Screenshot

#### Metagrid links
![screenshot](https://gitlab.com/ethlibrary/primo-explore-modules/primo-explore-eth-metagrid/-/raw/master/screenshot1.jpg)

## Installation

1. Assuming you've installed and are using [primo-explore-devenv](https://github.com/ExLibrisGroup/primo-explore-devenv).

2. Navigate to your view root directory. For example:
    ```
    cd primo-explore/custom/MY_VIEW_ID
    ```
3. If you do not already have a package.json file in this directory, create one:
    ```
    npm init -y
    ```
4. Install this package:
    ```
    npm install primo-explore-eth-metagrid --save-dev
    ```

## Usage

Once installed, inject `ethMetagridModule` as a dependency, and then add the eth-metagrid-component directive to the prmServiceLinksAfter component.

```js

import 'primo-explore-eth-metagrid';

var app = angular.module('viewCustom', ['ethMetagridModule']);

app.component('prmServiceLinksAfter',  {
        bindings: {parentCtrl: '<'},
        template: `<eth-metagrid-component after-ctrl="$ctrl"></eth-metagrid-component>`
    })

```
