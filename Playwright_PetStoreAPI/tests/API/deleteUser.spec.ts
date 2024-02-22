import { test, expect } from '@playwright/test'; 
import { initApiContext } from '../../src/utils/apiUtils'; 
import { ENV } from "../../src/utils/env/env";
import { readFileSync } from 'fs';



let username
let apiContext; 

    test.describe('Delete users', () => { 
        test.beforeEach(async () => { 
            if(ENV.PROJECT_NAME === 'pet'){
                console.log(ENV.PROJECT_NAME)
                console.log(ENV.BASE_URL)
              }
            apiContext = await initApiContext(); 
            username = JSON.parse(readFileSync('TestData/createUser.json','utf-8')).username
        }); 
    test('Delete user by username', async () => { 
        const response = await apiContext.delete(`user/${username}`);
        if(response.status() === 200){
         expect(response.status()).toBe(200);
         console.log(response.status)
         expect(response.ok()).toBeTruthy(); 
         const responseBody = await response.json(); 
         console.log(responseBody)
        }
        else if(response.status() === 404){
         expect(response.status()).toBe(404);
         console.log(response.status)
         expect(response.ok()).toBeFalsy(); 
         console.log("The user is already deleted")
        }
        else{
            console.error(`Unexpected status code :${response.status()}`)
        }
     }); 
})