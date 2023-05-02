# primo-explore-eth-metagrid (UNIGE edit)

This is a modified version of the [primo-explore-eth-metagrid module originally developed by ETH Zürich](https://gitlab.com/ethlibrary/primo-explore-modules/primo-explore-eth-metagrid/-/tree/master/)
to support IdRef IDs in addition to GNDs.

## Description

This Module integrates Metagrid into Primo VE.
It extracts the GND and IdRef IDs (by default in lds03 and lds90 respectively) and queries the Metagrid API with it.
With the whitelist the result is filtered and the links sorted by person are inserted into the links section.
The whitelist of providers whose links should be displayed can be changed in eth-metagrid.config.js. The array contains the slug of the respective provider (https://api.metagrid.ch/providers.json).
When you add a slug, you must also add the labels in the eth-metagrid.config.js (providers.json: 'short_description').


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
