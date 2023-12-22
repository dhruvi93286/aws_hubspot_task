// Import necessary modules
const axios = require('axios');

// Load environment variables from .env file
require('dotenv').config();

const baseUrl = process.env.BASE_URL;

/**
 * Performs a POST request to the specified API endpoint with the provided data.
 * @param {string} url - The API endpoint URL.
 * @param {object} data - The data to be sent in the request body.
 * @param {object} headers - The headers for the request.
 * @returns {Promise} A Promise that resolves to the API response data or rejects with an error.
 */
async function makeApiRequest(url, data, headers) {
  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error; // Re-throw the error for further handling if needed
  }
}

/**
 * Handles API errors and logs detailed error messages.
 * @param {object} error - The error object.
 */
function handleApiError(error) {
  if (error.response) {
    /*The request was made and the server responded with a status code */
    
    console.error('API Error:', error.response.status, error.response.data);
  } else if (error.request) {
    /*The request was made but no response was received*/

    console.error('Network Error:', error.request);
  } else {

    /*Something happened in setting up the request that triggered an Error*/
    console.error('Error:', error.message);
  }
}

const apiUrl = `${baseUrl}/createLead`;
const requestData = {
  properties: {
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe@example.com'
  }
};
const requestHeaders = {
  'Content-Type': 'application/json'
};

makeApiRequest(apiUrl, requestData, requestHeaders)
  .then(responseData => {
    console.log('Response:', responseData);
  })
  .catch(error => {
    /* Handle the error here if needed */
    console.error('Error during API request:', error.message);
  });
