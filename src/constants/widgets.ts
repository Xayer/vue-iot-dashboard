export const WidgetsAvailable = {
	TextWidget: "TextWidget",
	HueBridges: "HueBridges",
	HueLight: "HueLight",
	HueGroup: "HueGroup",
	RejseplanenDeparture: "RejseplanenDeparture",
};

export const WidgetTitles: { [key: string]: string } = {
	[WidgetsAvailable.TextWidget]: "Text",
	[WidgetsAvailable.HueBridges]: "Hue",
	[WidgetsAvailable.HueLight]: "HueLight",
	[WidgetsAvailable.HueGroup]: "Hue Group",
	[WidgetsAvailable.RejseplanenDeparture]: "Departure Board",
};

export const WidgetDefaultSettings: { [key: string]: Widget } = {
	[WidgetsAvailable.TextWidget]: {
		type: WidgetsAvailable.TextWidget,
		title: WidgetTitles[WidgetsAvailable.TextWidget],
		settings: {
			message: "Foo",
		},
		w: 6,
		h: 1,
		y: 1,
		x: 0,
		i: 0,
	},
	[WidgetsAvailable.HueBridges]: {
		type: WidgetsAvailable.HueBridges,
		title: WidgetTitles[WidgetsAvailable.HueBridges],
		settings: {},
		w: 6,
		h: 1,
		y: 1,
		x: 6,
		i: 1,
	},
	[WidgetsAvailable.HueLight]: {
		type: WidgetsAvailable.HueLight,
		title: WidgetTitles[WidgetsAvailable.HueLight],
		settings: {},
		w: 1,
		h: 1,
		y: 0,
		x: 0,
		i: 1,
	},
	[WidgetsAvailable.HueGroup]: {
		type: WidgetsAvailable.HueGroup,
		title: WidgetTitles[WidgetsAvailable.HueGroup],
		settings: {
			group: "",
		},
		w: 1,
		h: 1,
		y: 0,
		x: 0,
		i: 1,
	},
	[WidgetsAvailable.RejseplanenDeparture]: {
		type: WidgetsAvailable.RejseplanenDeparture,
		title: WidgetTitles[WidgetsAvailable.RejseplanenDeparture],
		settings: {
			title: "Departures",
			stationId: "461682600",
		},
		w: 6,
		h: 1,
		y: 2,
		x: 6,
		i: 2,
	},
};
