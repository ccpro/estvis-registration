export class FormData {
	companyInfo: CompanyInfo;
}

export class CompanyInfo {
	name: string = '';
	address: string = '';
	adminName: string = '';
	phone: string = '';
	email: string = '';
	fax: string = '';
	insurance_group_id = 0;
	users: UserInfo[];
}

export class RoleInfo {
	id: number;
	name: string;
	comment: string;
}

export class UserInfo {
	name = '';
	email = '';
	roles: number[];
}

export interface InsuranceInfo {
	id: number;
	name: string;
	is_default: boolean;
}

export class ConfigInfo {
	list: InsuranceInfo[];
	roles: RoleInfo[];
	states: string[];
}
