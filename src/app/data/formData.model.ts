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
}

export class UserInfo {
	name = '';
	email = '';
}

export class InsuranceInfo {
	id: number;
	name: string;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}
