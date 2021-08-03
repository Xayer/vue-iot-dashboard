export type SettingsResponse = {
	meta: {
		settings: {
			boards: BoardResponse[];
		};
	};
};

export type Settings = {
	settings: {
		boards: BoardResponse[];
		settings: Record<string, string>;
	};
};

export type BoardResponse = {
	name: string;
	widgets: string;
};
