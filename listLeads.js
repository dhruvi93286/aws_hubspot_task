// Import necessary modules
const axios = require('axios');

// Load environment variables from .env file
require('dotenv').config();
const baseUrl = process.env.BASE_URL;
/**
 * Lists leads by making a GET request to the specified API endpoint.
 * @param {string} apiUrl - The API endpoint URL for listing leads.
 * @param {object} headers - The headers for the request.
 * @returns {Promise} A Promise that resolves to the API response data or rejects with an error.
 */
async function listLeads(apiUrl, headers) {
  try {
    console.log('Listing leads...');

    const response = await axios.get(apiUrl, { headers });
    console.log('Leads listed successfully.');
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
    // The request was made and the server responded with a status code
    const { status, data } = error.response;
    console.error(`API Error: ${status} - ${data.error || data.message}`);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Network Error: No response received from the server.');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error(`Error: ${error.message}`);
  }
}


const listLeadsUrl =   `${baseUrl}/listLeads`;
const listLeadsHeaders = {
  'Content-Type': 'application/json'
};

listLeads(listLeadsUrl, listLeadsHeaders)
  .then(responseData => {
    const results = responseData.body.results;

    console.log('Results:', JSON.stringify(results, null, 2));
  
  })
  .catch(error => {
    // Handle the error here if needed
    console.error('Error during lead listing:', error.message);
  });
