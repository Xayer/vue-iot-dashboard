export type SettingsResponse = {
	meta: {
		settings: {
			boards: BoardResponse[];
			settings: SettingKeyValue[];
		};
	};
};

export type SettingKeyValue = {
	key: string;
	value: string;
}

export type UserSettings = {
	boards: BoardResponse[];
	settings: SettingKeyValue[];
};

export type BoardResponse = {
	name: string;
	widgets: string;
};
