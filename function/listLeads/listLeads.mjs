// Import necessary modules
import axios from 'axios';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

// Define the secret name in AWS Secrets Manager
const secret_name = "hubspot-api-key";

// Create an instance of the SecretsManagerClient
const client = new SecretsManagerClient({
  region: "eu-north-1",
});

let response;

try {
   // Retrieve the secret value from AWS Secrets Manager
  response = await client.send(
    new GetSecretValueCommand({
      SecretId: secret_name,
      VersionStage: "AWSCURRENT",
    })
  );
} catch (error) {
   // Log an error message and throw the error
  console.error('Error retrieving API key from Secrets Manager:', error);
  throw error;
}
// Parse the secret value as a JSON object
const secret = response.SecretString;
const secretObject = JSON.parse(secret);

// Access the property value
const apiKey = secretObject.key;

  
// Lambda function handler
export const handler = async (event, context) => {
 // Configure the axios request
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.hubapi.com/crm/v3/objects/contacts',
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    };

    try {
      // Make the API request using axios
        const response = await axios.request(config);
       
  console.log('API request successful:', response.data);
        return {
            statusCode: 200,
            body: response.data
        };
    } catch (error) {
        console.error('Error making API request:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};