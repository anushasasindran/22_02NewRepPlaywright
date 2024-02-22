import { test, expect } from '@playwright/test'; 
import { initApiContext } from '../../src/utils/apiUtils'; 
import { ENV } from "../../src/utils/env/env";
import { readFileSync } from 'fs';


let createdPetId;
let createdPetResponse
let apiContext; 

    test.describe('Delete Pet', () => { 
    
        test.beforeEach(async () => { 
            if(ENV.PROJECT_NAME === 'pet'){
                console.log(ENV.PROJECT_NAME)
                console.log(ENV.BASE_URL)
              }
            apiContext = await initApiContext(); 
            createdPetResponse = JSON.parse(readFileSync('tests/Outputs/createdPetResponse.json','utf-8'))
            createdPetId = createdPetResponse.id
            console.log(createdPetId)
        }); 
    test('Delete pet by id', async () => { 
        const response = await apiContext.delete(`pet/${createdPetId}`);
        if(response.status() === 200){
         expect(response.status()).toBe(200);
         console.log(response.status)
         expect(response.ok()).toBeTruthy(); 
         const responseBody = await response.json(); 
         console.log(responseBody)
        expect(parseInt(responseBody.message)).toBe(createdPetId)
        }
        else if(response.status() === 404){
         expect(response.status()).toBe(404);
         console.log(response.status)
         expect(response.ok()).toBeFalsy(); 
         console.log("The pet is already deleted")
        }
        else{
            console.error(`Unexpected status code :${response.status()}`)
        }
     }); 
})