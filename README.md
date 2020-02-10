# basic-text-field

![Default appearance for the 'basic text field' field plug-in](extras/preview.jpg)

## Description

A simple replacement for the default text field. Use this as a starting template when creating your own text field plug-in.

## Features

* Supports the `text` field type.
* Supports the following SurveyCTO field properties:

    * Default values
    * Constraint messages
    * Required messages
    * Read only
    * media:image
    * media:audio
    * media:video

* Supports the following SurveyCTO appearances:

    * `numbers`
    * `numbers_decimal`
    * `numbers_phone`

## How to use

**To use this plug-in as-is**, just download the [basic-text-field.fieldplugin.zip](basic-text-field.fieldplugin.zip) file from this repo, and attach it to your form.

To create your own field plug-in using this as a template, follow these steps:

1. Fork this repo
1. Make changes to the files in the `source` directory.

    * **Note:** be sure to update the `manifest.json` file as well.

1. Zip the updated contents of the `source` directory.
1. Rename the .zip file to *yourpluginname*.fieldplugin.zip (replace *yourpluginname* with the name you want to use for your plug-in).
1. You may then attach your new .fieldplugin.zip file to your form as normal.

## More resources
More instructions for developing and using field plug-ins can be found here: [https://github.com/surveycto/Field-plug-in-resources](https://github.com/surveycto/Field-plug-in-resources)