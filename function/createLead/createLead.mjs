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
  // Throw an error if there is an issue retrieving the secret
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
  try {
    // Parse the incoming JSON payload
    const requestData = event;
    const hubspotApiUrl = 'https://api.hubapi.com/crm/v3/objects/contacts';
    const hubspotApiKey = apiKey;

    // Configure the axios request
    const config = {
      method: 'post',
      url: hubspotApiUrl,
      headers: {
        'Authorization': `Bearer ${hubspotApiKey}`,
        'Content-Type': 'application/json'
      },
      data: {
        properties: {
          firstname: requestData.properties.firstname,
          lastname: requestData.properties.lastname,
          email: requestData.properties.email
        }
      }
    };

    try {
      // Make the API request using axios
      const response = await axios.request(config);

      return {
        statusCode: 200,
        body: response.data
      };
    } catch (error) {
      console.error(error);

      // Check for specific HTTP status codes
      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 409) {
          return {
            statusCode: 409,
            body: { error: 'Lead already exists.' }
          };
        } else if (statusCode === 500) {
          return {
            statusCode: 500,
            body: { error: 'Internal Server Error' }
          };
        }
      }

      // Handle other errors with a generic 500 status code
      return {
        statusCode: 500,
        body: { error: 'Internal Server Error' }
      };
    }
  } catch (error) {
    // Handle top-level errors
    console.error('Top-level error:', error);

    return {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    };
  }
};
