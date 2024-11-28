# Instructions

Please do not fork this repo on github or open a pull request. Submit your solution via email in an archive, which can be created with the following git command:

```bash
git archive HEAD . -o solution.tar
```

To run this project type:

```bash
pnpm install
pnpm dev
```

## Main task
Implement the MockClient class that should simulate the original class behavior
and has the following set of public methods listed in [MockClient.ts](./MockClient.ts).

**MockClient** should store db items in-memory.

Db items can be a different entities like a **User** or an **Application**.
The examples of original client usage:

### Create user

```typescript
await client
    .api("/users")
    .post({
        email: 'test@mail.co',
        firstName: 'John',
        lastName: 'Doe',
        deleted: true
    })
```


### Get 1 user by id

```typescript
await client
    .api(`/users/${userId}`)
    .select(['id', 'email'])
    .get()
```


### Get 1 user by any other property

```typescript
const [user] = await client
    .api("/users")
    .filter("email eq 'test@mail.co'")
    .top(1)
    .get()
```

### Get all deleted users

```typescript
const { value: users, ["@odata.nextLink"]: nextLink } = await client
    .api("/users")
    .select(['firstName', 'lastName', 'email', 'id'])
    .filter("deleted eq true")
    .top(10)
    .get()
```
 
in case there are more than 10 users in DB, get next page:

```typescript
const { value: nextUsers } = await client
    .api(nextLink)
    .get()
```

### Get users by provided ids

```typescript
await client
    .api("/users")
    .select(['firstName', 'lastName', 'email', 'id'])
    .top(999)
    .filter("id in ('id-1', 'id-2')")
    .get()
```

### Update and delete user

```typescript
await client
    .api(`/users/${userId}`)
    .update({ firstName: 'New Name' })
```

```typescript
await client
    .api(`/users/${userId}`)
    .update({ deleted: false })
```

## Bonus task

If the main task seems to you too easy, you can implement the unit tests for implemented methods.
Add 1-2 cases per each method.
Can use any test runners (jest or vitest are welcomed though)