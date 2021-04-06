import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import EditDashboard from '../views/EditDashboard.vue';
import Integrations from '../views/Integrations.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'dashboard',
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
	},
	{
		path: '/edit',
		name: 'dashboard-edit',
		component: () => import(/* webpackChunkName: "edit-dashboard" */ '../views/EditDashboard.vue'),
		hidden: true,
	},
	{
		path: '/integrations',
		name: 'integrations',
		component: () => import(/* webpackChunkName: "integrations" */ '../views/Integrations.vue'),
		children: [
			{
				path: '/integrations/hue',
				name: 'hue-integration',
				hidden: true,
				component: () => import(/* webpackChunkName: "hue-integration" */ '../views/integrations/hue.vue'),
			},
		],
	},
	/* {
		path: '/:slug',
		name: 'dashboard',
		component: Dashboard,
	},
	{
		path: '/:slug/edit',
		name: 'dashboard-edit',
		component: EditDashboard,
	}, */
	{
		path: '/about',
		name: 'about',
		hidden: true,
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
