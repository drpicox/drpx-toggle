drpx-toggle
===========

Simple Angular component that provides from a toggle that can be used as model, controller or directive


Install
-------

```bash
$ bower install --save drpx-toggle
```

add to your module the dependence:

```javascript
    angular.module('yourModule', ['drpxToggle']);
```

include the javascript library in your application:

```html
<script src="bower_components/drpx-toggle/drpx-toggle.js"></script>
```


How to use
----------

As a model:

```javscript
    YourController.$inject = ['DrpxToggle'];
    function YourController  ( DrpxToggle ) {
        this.toggle = new DrpxToggle();
        // this.toggle.open()
        // this.toggle.close()
        // this.toggle.isOpen(): bool
        // this.toggle.toggle()
    }
```

As instance from the factory (like ng $cacheFactory):

```javscript
    YourController.$inject = ['drpxToggleFactory'];
    function YourController  ( drpxToggleFactory ) {
        this.toggle = drpxToggleFactory('yourToggleId');
        // this.toggle.open()
        // this.toggle.close()
        // this.toggle.isOpen(): bool
        // this.toggle.toggle()
    }
```

As a controller:

```html
    <div ng-controller="DrpxToggleController as burger">
        <span ng-show="burger.isOpen()">Is open</span>
        <button ng-click="burger.open()">open()</button>
        <button ng-click="burger.close()">close()</button>
        <button ng-click="burger.toggle()">toggle()</button>
    </div>
```

As a directive:

```html
    <div drpx-toggle="yourToggleId">
        <span ng-show="yourToggleId.isOpen()">Is open</span>
        <button ng-click="yourToggleId.open()">open()</button>
        <button ng-click="yourToggleId.close()">close()</button>
        <button ng-click="yourToggleId.toggle()">toggle()</button>
    </div>
```

Or as directive as:

```html
    <div drpx-toggle="yourToggleId as burger">
        <span ng-show="burger.isOpen()">Is open</span>
        <button ng-click="burger.open()">open()</button>
        <button ng-click="burger.close()">close()</button>
        <button ng-click="burger.toggle()">toggle()</button>
    </div>
```
