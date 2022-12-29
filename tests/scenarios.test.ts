import supertest from 'supertest';
import { StatusCodes } from '../src/server/consts.js';
import { User } from '../src/user/User.js';
import { validate } from 'uuid';

jest.setTimeout(10000);
const baseUrl = 'http://localhost:4000';
const apiUrl = '/api/users/';

const fakeUser = {
    username: 'test user',
    age: 18,
    hobbies: ['test hobby']
};
const fakeUserWithId = { ... fakeUser, ...{id: ''} };

const arrayOfUsers:User[] = [];

describe('Scenario 1, chain of requests with one user', () => {
    it('should get an empty array of users, GET request', async () => {
        const response = await supertest(baseUrl)
                                .get(apiUrl);
        expect(response.statusCode).toEqual(StatusCodes.OK);
        expect(response.body).toEqual(arrayOfUsers);
    });

    it('should get newly created user, POST request', async () => {
        const response = await supertest(baseUrl)
                                .post(apiUrl)
                                .send(fakeUser);
        fakeUserWithId.id = response.body.id;
        expect(response.statusCode).toEqual(StatusCodes.CREATED);
        expect(response.body).toEqual(fakeUserWithId);
    });

    it('should get user by id, GET request by id', async () => {
        const response = await supertest(baseUrl)
                                .get(apiUrl + '/' + fakeUserWithId.id);
        expect(response.statusCode).toEqual(StatusCodes.OK);
        expect(response.body).toEqual(fakeUser);
    });

    it('should get updated user by id, PUT request by id', async () => {
        const fakeUserUpdated = {
            username: 'test user updated',
            age: 20,
            hobbies: ['test hobby updated']
        };
        const fakeUserWithIdUpdated = { ... fakeUserUpdated, ...{id: fakeUserWithId.id} };
        const response = await supertest(baseUrl)
                                .put(apiUrl + '/' + fakeUserWithId.id)
                                .send(fakeUserUpdated);
        expect(response.statusCode).toEqual(StatusCodes.OK);
        expect(response.body).toEqual(fakeUserWithIdUpdated);
    });

    it('should get a confirmation of successful deletion, DELETE request', async () => {
        const response = await supertest(baseUrl)
                                .delete(apiUrl + '/' + fakeUserWithId.id);
        expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('should get an answer with no such object, GET request by id', async () => {
        const response = await supertest(baseUrl)
                                .get(apiUrl + '/' + fakeUserWithId.id);
        expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
    });
                                
});




const notUuidUserID = 'incorrect user id';
const fakeUserId = 'ee8625f6-14cf-4fb9-82c6-68bc8d98bc79';
const incorrectRequestBody = [
    {
        username: 'test user'
    },
    {
        age: 18
    },
    {
        hobbies: ['test hobby']
    },
    {
        username: 'test user',
        age: 18
    },
    {
        username: 'test user',
        hobbies: ['test hobby']
    },
    {
        age: 18,
        hobbies: ['test hobby']
    },
    {},
    {
        fakeKey: 'fakeValue'
    }
]
const incorrectApiUrl = '/api/incorrect/';

describe('Scenario 2, handle errors', () => {

    it('should get an answer with status code 400 and corresponding message if userId is invalid (not uuid), GET request by id', async () => {
        if (!validate(notUuidUserID)) {
            const response = await supertest(baseUrl)
                                    .get(apiUrl + '/' + notUuidUserID);
            expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        }
    });

    it('should get an answer with status code 404 and corresponding message if record with id === userId doesnt exist, GET request by id', async () => {
        const response = await supertest(baseUrl)
                                .get(apiUrl + '/' + fakeUserId);
        expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
    });

    
    it.each(incorrectRequestBody)('should get an answer with status code 400 and corresponding message if request body does not contain required fields, POST request', async (body) => {
        
            const response = await supertest(baseUrl)
                                        .post(apiUrl)
                                        .send(body);
            expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);

    });

    it('should get an answer with status code 400 and corresponding message if userId is invalid (not uuid), PUT request by id', async () => {
        if (!validate(notUuidUserID)) {
            const response = await supertest(baseUrl)
                                    .put(apiUrl + '/' + notUuidUserID)
                                    .send(fakeUser);
            expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        }
    });

    it('should get an answer with status code 404 and corresponding message if record with id === userId doesnt exist, PUT request by id', async () => {
            const response = await supertest(baseUrl)
                                    .put(apiUrl + '/' + fakeUserId)
                                    .send(fakeUser);
            expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
    });

    it('should get an answer with status code 400 and corresponding message if userId is invalid (not uuid), DELETE request by id', async () => {
        if (!validate(notUuidUserID)) {
            const response = await supertest(baseUrl)
                                    .delete(apiUrl + '/' + notUuidUserID);
            expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        }
    });

    it('should get an answer with status code 404 and corresponding message if record with id === userId doesnt exist, DELETE request by id', async () => {
        const response = await supertest(baseUrl)
                                .delete(apiUrl + '/' + fakeUserId);
        expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
    });

    it('should get an answer with status code 400 and corresponding message if request to non-existing endpoints, GET request', async () => {
        const response = await supertest(baseUrl)
                                .get(incorrectApiUrl);
        expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
    })
               
});
