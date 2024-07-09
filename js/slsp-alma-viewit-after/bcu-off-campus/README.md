# Off-campus message for subscribed resources

This is a modified version of the module [eth-fullview-offcampus-warning ](https://gitlab.com/ethlibrary/slsp/customization-eth-view/-/tree/master/js/modules/prm-alma-delivery-after/eth-fullview-offcampus-warning)
developed by the ETH Library, and further customized by BCU-Fribourg.

This module displays a warning message to off-campus and non logged-in users when presenting restricted access results 
(i.e. that require a subscription):

![Screenshot of the Primo catalogue showing a warning message.](bcu-off-campus.png)

Binding directive: `slsp-alma-viewit-after` ([SLSP custom directive](https://github.com/Swiss-Library-Service-Platform/swisscovery/blob/main/41SLSP_NETWORK-VU1_UNION/js/slsp-archives-viewit/js/slsp-archives-viewit.module.js) inside `prm-alma-viewit-after`).

## Usage

### Enable the module

To enable this module, copy it inside your view's Javascript folder, import it into your `main.js` and add `bcuOffCampusModule` to the list of declared modules.

Following our network practice, at UNIGE we try to keep this folder organized by the directives to which modules are bound, but you don't have to. 

We also defined our own subdirective `bcu-off-campus` because we have several modules binding to `slsp-alma-viewit-after`.
Accordingly, the subdirectives and module declaration is done in [`slsp-alma-viewit-after/slsp-alma-viewit-after.module.js`](../slsp-alma-viewit-after.module.js).

[`slsp-viewit-after`](https://github.com/Swiss-Library-Service-Platform/swisscovery/blob/main/41SLSP_NETWORK-VU1_UNION/js/slsp-archives-viewit/js/slsp-archives-viewit.module.js) is itself a custom directive defined by the SLSP network package to which UNIGE is part of.
If you want to use this module outside of SLSP, you will need to edit it so it binds to `prm-alma-viewit-after` instead.

### Edit configuration file

The text that is displayed by the module as well as the URL for more details are defined in [`bcu-off-campus.config.js`](bcu-off-campus.config.js).

### Edit CSS

The following CSS code should be added to your custom.css (or equivalent). Edit as required.

```CSS
.bcu-fullview-offcampus {
    margin-top: 1em;
    padding: 1em 1em 0.5em;
    background-color: #ff9900;
    color: black;
    -webkit-box-shadow: rgba(0, 0, 0, 0.03) 0px 1px 0px 0px, rgba(0, 0, 0, 0.07) 0px 5px 5px -3px;
    box-shadow: rgba(0, 0, 0, 0.03) 0px 1px 0px 0px, rgba(0, 0, 0, 0.07) 0px 5px 5px -3px;
}

.bcu-fullview-offcampus > div {
  margin-left: 1em;
}

.bcu-fullview-offcampus a {
  color: #0030a0;
}
```

### Dependencies

This module requires the [eth-config](../../services/eth-config.service.js) and [unige-userid](../../services/unige-userid.service.js)
services. At UNIGE, we are using these services for multiple modules, 
so we are keeping a single copy in a dedicated  folder. You can also copy the service files inside this module. Make sure to edit the 
`require` statement accordingly.

## Known issues

No known issues at this time.

## Changelog

* 2024-07-09 [TG] Removed check for WWW resources labeled in public notes
* 2024-07-02 [TG] Released module for internal testing.

## Credits

The original [eth-fullview-offcampus-warning module ](https://gitlab.com/ethlibrary/slsp/customization-eth-view/-/tree/master/js/modules/prm-alma-delivery-after/eth-fullview-offcampus-warning) was developed at ETH Zurich. Our version builds on a copy of this module further customized for BCU-Fribourg.