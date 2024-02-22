import { test, expect } from '@playwright/test'; 
import { initApiContext } from '../../src/utils/apiUtils'; 
import { ENV } from "../../src/utils/env/env";
import { readFileSync } from 'fs';


let createdUserId;
let userName,userData
let apiContext; 

    test.describe('Update User', () => { 
        test.beforeEach(async () => { 
            if(ENV.PROJECT_NAME === 'pet'){
                console.log(ENV.PROJECT_NAME)
                console.log(ENV.BASE_URL)
              }
            apiContext = await initApiContext(); 
            createdUserId = JSON.parse(readFileSync('tests/Outputs/createduserId.json','utf-8')).createdID
            console.log(createdUserId)
            userData = JSON.parse(readFileSync('TestData/createUser.json','utf-8'))
            userName = userData.username
        }); 
    test('Update user by user name', async () => { 
        const modifiedData = {
            ...userData,
            firstname:"firstupdated",
            secondname:"lastupdated",
            email:"updated@test.com"
        }
        const response = await apiContext.put(`user/${userName}`,{
        data:modifiedData
        });
        if(response.status() === 200){
         expect(response.status()).toBe(200);
         console.log(response.status)
         expect(response.ok()).toBeTruthy(); 
         const responseBody = await response.json(); 
         console.log(responseBody)
        expect(parseInt(responseBody.message)).toBe(parseInt(createdUserId))
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