import { test, expect } from '@playwright/test'; 
import { initApiContext } from '../../src/utils/apiUtils'; 
import { ENV } from "../../src/utils/env/env";
import { readFileSync } from 'fs';


let createdUserId;
let userName
let apiContext; 



    test.describe('Get User Details', () => { 
        test.beforeEach(async () => { 
            if(ENV.PROJECT_NAME === 'pet'){
                console.log(ENV.PROJECT_NAME)
                console.log(ENV.BASE_URL)
              }
            apiContext = await initApiContext(); 
            createdUserId = JSON.parse(readFileSync('tests/Outputs/createduserId.json','utf-8')).createdID
            console.log(createdUserId)
            userName = JSON.parse(readFileSync('TestData/createUser.json','utf-8')).username
        }); 
    test('Get user by user name', async () => { 
        const response = await apiContext.get(`user/${userName}`);
        if(response.status() === 200){
         expect(response.status()).toBe(200);
         console.log(response.status)
         expect(response.ok()).toBeTruthy(); 
         const responseBody = await response.json(); 
         console.log(responseBody)
        expect(responseBody.id).toBe(parseInt(createdUserId))
        expect(responseBody.username).toBe(userName)
        }
        else if(response.status() === 404){
         expect(response.status()).toBe(404);
         console.log(response.status)
         expect(response.ok()).toBeFalsy(); 
         const responseBody = await response.json(); 
         expect(responseBody.message).toEqual('User not found')
         console.log(responseBody)
        }
        else{
            console.error(`Unexpected status code :${response.status()}`)
        }
     }); 
})