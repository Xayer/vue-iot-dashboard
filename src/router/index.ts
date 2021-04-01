import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import EditDashboard from '../views/EditDashboard.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'dashboard',
		component: Dashboard,
	},
	{
		path: '/edit',
		name: 'dashboard-edit',
		component: EditDashboard,
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
