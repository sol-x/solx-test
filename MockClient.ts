interface DbEntity {
	[key: string]: unknown;
	id: string;
	deleted: boolean;
}

type ClientGetResponse =
	| {
	value: DbEntity;
	"@odata.nextLink"?: string;
}
	| DbEntity;

interface ClientCreateResponse extends DbEntity {}

interface Client {
	api(nextKey: string): this;
	top(n: number): this;
	select(properties: string | string[]): this;
	filter(filterStr: string): this;
	get(): Promise<ClientGetResponse>;
	post(payload: object & { length?: never }): Promise<ClientCreateResponse>;
	update(payload: Omit<DbEntity, "id">): Promise<void>;
}

export class MockClient implements Client {
	constructor(private readonly storage: Map<string, DbEntity[]>) {}

	api(nextKey: string): this {
		return this;
	}

	filter(filterStr: string): this {
		return this;
	}

	get(): Promise<ClientGetResponse> {
		throw new Error("Not implemented");
	}

	post(payload: object & { length?: never }): Promise<ClientCreateResponse> {
		throw new Error("Not implemented");
	}

	select(properties: string | string[]): this {
		return this;
	}

	top(n: number): this {
		return this;
	}

	update(payload: Omit<DbEntity, "id">): Promise<void> {
		throw new Error("Not implemented");
	}
}