# Display open/closed stacks notice in Primo

This is a modified version of the module [usi-location-open-close](https://github.com/binde77/41SLSP_USI-BiUSI/tree/master/js/modules/prm-location-holdings-after/usi-location-open-close)
developed by the Università della Svizzera Italiana library (BiUSI).

If a displayed item belongs to UNIGE, it checks against a list of locations to identify whether the item is on open or closed stacks:

![Screenshot of the Primo catalogue showing a different message whether an item is on an open shelf or not.](unige-location-open-close-display.png)

Binding directive: `prm-location-holdings-after/usi-location-open-close-component`

## Usage

### Enable the module

To enable this module, copy it inside your view's Javascript folder. Following our network practice, at UNIGE we try to keep this folder organized
by the directives to which modules are bound, but you don't have to.

This modules binds to the `prm-location-holdings-after` Primo directive. To prevent collision with other modules using this directive, we are adding
a new `usi-location-open-close-component` directive in [`prm-location-holdings-after.module.js`](../prm-location-holdings-after.module.js) to which
we are binding this module.

Alternatively, if you don't have other modules binding to `prm-location-holdings-after`, you can also modify the code to bind to this directive instead.
After you do so, make sure to `require` the module's folder and to declare the module in your `main.js` file.

### Edit configuration file

Edit `usi-location-open-close.config.js` according to your needs.

Specify your library ID in `libraryId`.

There are two possible ways to define the list of closed location codes. The most straighforward way is to provide them as an array in 
`closedLocations`:

```JavaScript
export const usiLocationOpenCloseConfig = function(){
    return {
        closedLocations: ['610110000','610110004','610110006'],
        closedLocationsLabelCode: '',
        closedLocationsLabelLanguage: '',
        libraryId: '41SLSP_UGE'
    }
}
```

Alternatively, you can define this value in a custom label in Alma. This can be useful e.g. if you need staff to be able to edit this list
from time to time without having to edit your view code each time. To use this approach, leave `closedLocations` empty and instead
provide the label code containing the list of locations in `closedLocationsLabelCode` as well as the language for which your are defining
the label for in `closedLocationsLabelLanguage`:

```JavaScript
export const usiLocationOpenCloseConfig = function(){
    return {
        closedLocations: [],
        closedLocationsLabelCode: 'unige.closed.locations.list',
        closedLocationsLabelLanguage: 'fr',
        libraryId: '41SLSP_UGE'
    }
}
```

In your custom label, locations need to be separated by a comma (,). They don't need to be individually wrapped in quotes.

### Dependencies

This module requires the [eth-config service](../../services/eth-config.service.js). At UNIGE, we are using this service for multiple modules, 
so we are keeping a single copy of it in a dedicated  folder. You can also copy the service file inside this module. Make sure to edit the 
`require` statement accordingly.

This module also requires the following labels to be defined in order to properly display text in the correct language. Here are the labels
we are using, which you can customize:

```
ViewIt Labels : unige.stacks_open

EN : Open Stacks
FR : Dépôt en libre accès
DE : Frei zugänglich
IT : A libero accesso

ViewIt Labels : unige.stacks_closed

EN : Closed Stacks
FR : Dépôt non accessible au public
DE : Geschlossener Standort
IT : A scaffale chiuso
```

Additionnaly, if you're using a custom label to specify the list of closed locations (see previous section), that label needs to 
be defined as well.

It also requires two icons to be stored in the view's `img` directory. Mind that their URL in `usi-location-open-close.html` has the view ID
hard coded, which needs to be edited according to yours.

## Known issues

* The view ID is hard coded in the HTML template file for linking to the icons. It would be good to make this independent of the view ID.

## Changelog

* 2024-07-09 [TG] Added support for locations list in custom Alma label value.
* 2023-06-21 [TG] Added watcher to update display when multiple locations are present and when browsing search results.
* 2023-06-14 [TG] Adapted module to UNIGE's context from BiUSI.

## Credits

[Original Primo module](https://github.com/binde77/41SLSP_USI-BiUSI/tree/master/js/modules/prm-location-holdings-after/usi-location-open-close) from Silvio Bindella (BiUSI). 