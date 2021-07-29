import Vue from "vue";
import VueRouter from "vue-router";

export interface Route {
	path: string;
	name: string;
	hidden: boolean;
	icon: string;
}

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "dashboard",
		icon: "grid-1x2",
		component: () => import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
	},
	{
		path: "/edit",
		name: "dashboard-edit",
		component: () => import(/* webpackChunkName: "edit-dashboard" */ "../views/EditDashboard.vue"),
		hidden: true,
	},
	{
		path: "/integrations",
		name: "integrations",
		icon: "gear",
		component: () => import(/* webpackChunkName: "integrations" */ "../views/Integrations.vue"),
		children: [
			{
				path: "/integrations/hue",
				name: "hue-integration",
				hidden: true,
				component: () =>
					import(/* webpackChunkName: "hue-integration" */ "../views/integrations/hue.vue"),
			},
			{
				path: "/integrations/spotify",
				name: "spotify-integration",
				component: () =>
					import(
						/* webpackChunkName: "spotify-integration-page" */ "../views/integrations/spotify.vue"
					),
				hidden: true,
			},
			{
				path: "/integrations/config",
				name: "config-integration",
				component: () =>
					import(/* webpackChunkName: "config-integration" */ "../views/integrations/config.vue"),
				hidden: false,
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
		path: "/about",
		name: "about",
		hidden: true,
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

export default router;
