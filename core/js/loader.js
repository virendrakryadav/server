/*
 * @copyright Copyright (c) 2018 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * @namespace OCP
 * @class Loader
 */
OCP.Loader = {
	loadedScripts: {},
	loadedStylesheets: {},

	/**
	 * Load a script asynchronously
	 *
	 * @param {string} app
	 * @param {string} file
	 * @returns {Promise}
	 */
	loadScript: function(app, file) {
		const key = app + file;
		if (this.loadedScripts.hasOwnProperty(key)) {
			return Promise.resolve();
		} else {
			this.loadedScripts[key] = true;
			return new Promise(function (resolve, reject) {
				var scriptPath = OC.filePath(app, 'js', file);
				var script = document.createElement('script');
				script.src = scriptPath;
				script.setAttribute('nonce', btoa(OC.requestToken));
				script.onload = () => resolve();
				script.onerror = () => reject(`Failed to load script from ${scriptPath}`);
				document.head.appendChild(script);
			});
		}
	},

	/**
	 * Load a stylesheet file asynchronously
	 * @param {string} app
	 * @param {string} file
	 */
	loadStylesheet: function(app, file) {
		return new Promise(function (resolve, reject) {
			var stylePath = OC.filePath(app, 'css', file);
			var link = document.createElement('link');
			link.href = stylePath;
			link.type = 'text/css';
			link.rel = 'stylesheet';
			link.onload = () => resolve();
			link.onerror = () => reject(`Failed to load stylesheet from ${stylePath}`);
			document.getElementsByTagName('head')[0].appendChild(link);
		});
	},
}
