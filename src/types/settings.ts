export type SettingsResponse = {
	id: number;
	name: string;
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

export type UserInfo = {
	id?: number;
	name?: string;
}
