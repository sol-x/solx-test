import { MockClient } from "./MockClient";

(async () => {
	const client = new MockClient(new Map())

	const users = await client.api("/users").get()
	console.log(users);
})()