import { request, APIRequestContext } from '@playwright/test'
import { ENV } from "../../src/utils/env/env";
import defineConfig from "../../playwright.config"


// Function to initialize and return the API context with default headers
export async function initApiContext(){
  
    let baseURL = process.env.BASE_URL || defineConfig.use?.baseURL
 const apiContext = await request.newContext(
    { 
        baseURL: baseURL, 
        extraHTTPHeaders: 
            { 
                'Content-Type': 'application/json', 
                'api_key': 'special-key', 
            }, 
    }); 
    return apiContext; 
}