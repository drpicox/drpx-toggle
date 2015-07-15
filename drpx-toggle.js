/*
	DrpxToggle:
		.isOpen()
		.toggle()
		.open()
		.close()

	drpxToggleFactory(name): DrpxToggle # service for given name with .destroy() to remove

	DrpxToggleController: delegates to a DrpxToggle
		.toggle

	<ANY drpx-toggle="toggle [as scopeName]">...</ANY>
		controller: DrpxToggleController
*/
;(function(angular) {
	'use strict';

	angular
		.module('drpxToggle', [])
		.factory('DrpxToggle', DrpxToggleFactory)
		.factory('drpxToggleFactory', drpxToggleFactoryFactory)
		.controller('DrpxToggleController', DrpxToggleController)
		.directive('drpxToggle', drpxToggleDirective)
		;

	function DrpxToggleFactory() {
		/*jshint validthis:true */
		function DrpxToggle() {
			this.opened = false;
		}
		DrpxToggle.prototype.close = close;
		DrpxToggle.prototype.isOpen = isOpen;
		DrpxToggle.prototype.open = open;
		DrpxToggle.prototype.toggle = toggle;

		function close() { // jshint ignore:line
			this.opened = false;
		}
		function isOpen() {
			return this.opened;
		}
		function open() { // jshint ignore:line
			this.opened = true;
		}
		function toggle() {
			this.opened = !this.opened;
		}

		return DrpxToggle;
	}

	drpxToggleFactoryFactory.$inject = ['DrpxToggle'];
	function drpxToggleFactoryFactory  ( DrpxToggle ) {
		function drpxToggleFactory(name) {
			var toggle;

			toggle = find(name);
			if (!toggle) {
				toggle = create(name);
			}

			return toggle;
		}

		var toggles = {};

		function create(name) {
			var toggle;

			toggle = new DrpxToggle();
			toggle.destroy = destroy.bind(null, name);
			toggles[name] = toggle;

			return toggle;
		}

		function destroy(name) {
			delete toggles[name];
		}

		function find(name) {
			// no 'new' name can be stored
			if (name === 'new') { return; }
			
			return toggles[name];
		}

		return drpxToggleFactory;
	}

	DrpxToggleController.$inject = ['DrpxToggle'];
	function DrpxToggleController  ( DrpxToggle ) {
		this.toggle = new DrpxToggle();
	}

	drpxToggleDirective.$inject = ['drpxToggleFactory'];
	function drpxToggleDirective  ( drpxToggleFactory ) {
		var directive = {
			restrict: 'A',
			controller: 'DrpxToggleController',
			link: link,
		};

		var expr = /^\s*([A-Za-z]\w*)(\s+as\s+([A-Za-z]\w*))?\s*$/;

		function link(scope, element, attrs, controller) {
			var as, match, name, toggle;

			match = attrs.drpxToggle.match(expr);
			if (match) {
				name = match[1];
				as = match[3];
				toggle = drpxToggleFactory(name);
				if (as) { scope[as] = toggle; }
				controller.toggle = toggle;
			}
		}

		return directive;
	}

})(angular);
