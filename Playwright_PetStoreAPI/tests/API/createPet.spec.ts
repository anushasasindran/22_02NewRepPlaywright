import { test, expect } from '@playwright/test'; 
import { initApiContext } from '../../src/utils/apiUtils'; 
import { ENV } from "../../src/utils/env/env";
import { writeFile } from 'fs/promises';


let createdPetId;
let petData;
let apiContext; 

    test.describe('Create pet', () => { 

      test.beforeAll(async () => { 
         if(ENV.PROJECT_NAME === 'pet'){
           console.log(ENV.PROJECT_NAME)
           console.log(ENV.BASE_URL)
         }
           apiContext = await initApiContext(); 
           petData = JSON.parse(
               JSON.stringify(require("../../TestData/createPet.json"))
             );
       }); 
   
       test.afterAll(async () => {
         await new Promise(resolve => 
            setTimeout(resolve,5000));
       })
       
    test('Create a new pet', async () => { 
        const response = await apiContext.post('pet',
         { 
            data: petData.valid, 
         }); 
         if(response.status() === 200){
         expect(response.status()).toBe(200);
         console.log(response.status)
         expect(response.ok()).toBeTruthy(); 
         const responseBody = await response.json(); 
         console.log(responseBody)
         //expect(responseBody).toEqual(petData); 
         createdPetId = responseBody.id; // Storing the pet's ID for future use 
         console.log(`Created pet ID: ${createdPetId}`);
         await writeFile('tests/Outputs/createdPetResponse.json',JSON.stringify(responseBody,null,2))
         }
         else {
            console.error(`Unexpected status code :${response.status()}`)
         }
     }); 

     test('Create a new pet - invalid data', async () => { 
        const response = await apiContext.post('pet',
         { 
            data: petData.invalid, 
         }); 
         if(response.status() === 500){
         expect(response.status()).toBe(500);
         console.log(response.status)
         expect(response.ok()).toBeFalsy(); 
         const responseBody = await response.json(); 
         expect(responseBody.message).toEqual('something bad happened')
         console.log(responseBody)
         }
         else {
            console.error(`Unexpected status code :${response.status()}`)
         }
     }); 
})