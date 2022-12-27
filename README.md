# 🚀 Welcome to the CRUD API project!

First of all clone the repository: https://github.com/YuliyaShu/CRUD-API.git (if necessary --> ```git switch dev```)

You can now run 

```
npm run start:dev
npm run start:prod
```

to start your application

Then go to https://www.postman.com/ and send requests:

**Get all users** -> GET http://127.0.0.1:4000/api/users

**Create new user** -> POST http://127.0.0.1:4000/api/users + body raw JSON 
```
{
    "username": "string",
    "age": 50,
    "hobbies": []
}
```

**Get user by id** -> GET http://127.0.0.1:4000/api/users/${id}

**Update user** -> PUT http://127.0.0.1:4000/api/users/${id} + body raw JSON 
```
{
    "username": "string2",
    "age": 55,
    "hobbies": ["hobby"]
}
```

**Delete user** -> DELETE http://127.0.0.1:4000/api/users/${id}

