import supertest from 'supertest';
import { StatusCodes } from '../src/server/consts.js';
import { User } from '../src/user/User.js';

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
