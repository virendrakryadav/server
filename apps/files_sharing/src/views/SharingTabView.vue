<template>
	<div>
		<h1>Vue sharing</h1>
		<multiselect v-model="value" :options="options" :placeholder="placeholder">
			<template slot="singleLabel" slot-scope="props">
				<avatar uid="admin"></avatar>
				<span class="option__desc"><span class="option__title">{{ props.option }}</span></span>
			</template>
		</multiselect>
		<pre> {{ $root.model }} </pre>

	</div>
</template>

<style>
	.multiselect {
		width: 100%;
	}
</style>

<script>
	import { Multiselect, Avatar } from 'nextcloud-vue';

	export default {
		name: "SharingTabView",
		components: {
			Multiselect: Multiselect,
			Avatar
		},
		data() {
			return {
				enabled: false,
				generatingCodes: false,
				codes: undefined,
				value: null,
				options: ['list', 'of', 'options']
			};
		},
		beforeMount() {
			console.log(this.$root.model)
		},
		computed: {
			placeholder() {
				return t('core', 'Name, federated cloud ID or email address...');
			}
		},
		created: function() {
		},
		methods: {
		}
	}
</script>
