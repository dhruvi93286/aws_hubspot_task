# HubSpot Integration with AWS Lambda (Node.js)

This repository contains Node.js scripts for integrating with the HubSpot API using AWS Lambda functions. The objective of this project is to create and list leads in HubSpot via AWS Lambda triggers.

## Prerequisites

- **HubSpot API Key**: Obtain a HubSpot API key from the HubSpot Developer Dashboard.
- **AWS Account**: Access to an AWS account for managing Lambda functions, API Gateway, and AWS Secrets Manager.
- **Node.js**: Ensure Node.js is installed on your local development environment.

## Setup Instructions

1. Clone this repository to your local machine.
2. Open a terminal.
3. Navigate to the project directory.
4. Install project dependencies using `npm install`.
5. To create a lead, run the following command in your terminal: `node createLead.js`
6. To list leads, run the following command in your terminal:`node listLeads.js`

## Files Included

- **createLead.js**: Lambda function to create a new lead in HubSpot.
- **listLeads.js**: Lambda function to list leads from HubSpot.
- **function/**
  - **createLead**: Lambda function and configuration for creating leads in HubSpot.
     - **createLead.yaml**: YAML configuration file for the createLead Lambda function.
     - **createLead.mjs**: Code file for the createLead Lambda function.
  - **listLeads**: Lambda function and configuration for listing leads from HubSpot.
     - **listLeads.yaml**: YAML configuration file for the listLead Lambda function.
     - **listLeads.mjs**: Code file for the listLead Lambda function.
- **README.md**: Instructions and details about the project.
- **.env.example**: Example file for environment variables.

## Usage

### Lambda Function: Create Lead

#### Parameters
- `first_name`: First name of the lead.
- `last_name`: Last name of the lead.
- `email`: Email address of the lead.

### Lambda Function: List Leads

#### Parameters
- `limit`: Number of leads to return.

## Deployment Steps

1. Upload the Lambda functions to your AWS Lambda Console.
2. Set up triggers, such as API Gateway, for each function.
3. Utilize AWS Secrets Manager to securely store the HubSpot API key.
4. Set environment variables or configure Lambda functions to retrieve the API key securely from Secrets Manager.
5. Ensure appropriate IAM roles and permissions are set for Lambda functions to access Secrets Manager.

## Dependencies

- **axios**: Used for making HTTP requests in Node.js.

## Additional Notes

- Implement logging to capture critical information and errors.
- Error handling is in place for API requests.
- Security measures have been taken to handle sensitive credentials securely using AWS Secrets Manager.
- API Gateway has been used to trigger Lambda functions.

## Contributors

- [Your Name or GitHub Username]

## Evaluation Criteria

1. **Functionality**: Verify if the code successfully creates and lists leads in HubSpot.
2. **Code Quality**: Check if the code is well-structured, readable, and well-documented.
3. **Error Handling**: Review how the code handles errors gracefully.
4. **Security**: Assess how sensitive credentials are handled securely using AWS Secrets Manager.
5. **AWS Integration**: Check the integration with AWS services, such as API Gateway and Secrets Manager.