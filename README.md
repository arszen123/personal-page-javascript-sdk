# Javascript OAuth sdk for the PersonalPage project

### Build
```npm run build```

### Usage
#### Client initialization
```js
PP.init({
  clientId: 'clientId',
  redirectUri: 'https://example.com', //optional. It must be the base url.
  scopes: ['read'] //optional
})
```
#### Login
```js
PP.auth().login(value => {
  console.log(value); // {success: true, token: 'token', status: 'status'}
});
// or
PP.auth().loginWithToken(token); // not recommended
```
#### Getting user data
```js
PP.auth().user.data.then(console.log);
PP.auth().user.experience.then(console.log);
PP.auth().user.education.then(console.log);
PP.auth().user.contact.then(console.log);
PP.auth().user.skill.then(console.log);
PP.auth().user.getToken();
```

#### Logout
```js
PP.auth().logout(value => {
  console.log(value);
});
```
