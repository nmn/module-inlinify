# module-inlinify
A simple browserify transform to inline the results of some of the modules.

```
npm install module-inlinify
```

It's time to stop choosing between developer productivity and performance for the front-end
Using this browserify transform, you can take certain modules and inline the results.

Here are a few examples:

### Stilr

Stilr is a utility for managing CSS in React projects by creating dynamically generated classNames.
With it you would write you styles something like this:

```
var StyleSheet = require('stilr')

module.exports = StyleSheet.create({
  container: {
    background: 'blue'
  },
  item: {
    color: 'white'
  }
})
```

The `StyleSheet.create` function converts the object into a simple object that maps from the original keys to classNames. So a file that imports this file can get the className with `styles.container` and `styles.item`.

This is great for developer productivity, but you shouldn't have to pay for that with all your CSS in your JS in production.

If you apply the inlinify transform, and set the config to include this file, it would be transformed to:

```
module.export = {"container": "_jsie0", "item":"_hie38"}
```

Just the parts you need, and nothing else!

Module-Inlinify will import this file compute the output, and replace the contents of the file if the output is a simple value. This means that you can write any valid node code in these modules. Variables, function calls, requiring modules are all fair-game.

### Usage 

The usage is fairly straight-forward.

In your package.json file add a section config for module-inlinify, and mention a glob for files to include.

```
"module-inlinify": {
  "include": "*.inline.js"
}
```
This would inline the results of all modules whose paths end in `.inline.js`

Now, you can just add the transform to your browserify command, and you're done.
