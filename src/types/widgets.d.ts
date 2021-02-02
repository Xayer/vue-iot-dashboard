type Widget = {
	type: string;
	title: string;
	settings: WidgetSetting[];
	w: number;
	h: number;
	x: number;
	y: number;
	i: number;
}

type WidgetSetting = {
	[key: string]: any | null;
}
