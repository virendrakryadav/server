import Vue from 'vue';
import SharingTabView from './views/SharingTabView';

Vue.prototype.t = t;

(function() {
	var ShareTabView = window.OCA.Files.DetailTabView.extend(
		/** @lends OCA.Sharing.ShareTabView.prototype */ {
		id: 'shareTabViewVue',
		className: 'tab shareTabView',

		getLabel: function() {
			return t('files_sharing', 'Sharing Vue');
		},

		getIcon: function() {
			return 'icon-shared';
		},

		render: function() {
			this.$el.html('<div id="files_sharing_vue"></div>');
			console.log('' + this.model.id);
			var vm = new Vue({
				el: '#files_sharing_vue',
				render: h => h(SharingTabView),
				data: {
					model: this.model
				}
			});
		}
	});

	OC.Plugins.register('OCA.Files.FileList', {
		attach: function (fileList) {
			var shareTab = new ShareTabView('shareTabView', {order: -20});
			fileList.registerTabView(shareTab);
		}
	});

})();
