# StoreFrontEnd

This project was generated with Angular CLI version 16.1.6.

### Getting Started
This is an API for an online shopping application. It enables consumers to interact with the application programmatically.

### Required Technologies
The project utilizes the following technologies:
- Prettier: Formatting tool for ensuring code consistency. 
- TypeScript: Language for application-scale JavaScript development. 
- Auth0: Solution for authentication and authorization processes. 
- UploadCare: Service for smoothly uploading images to the cloud. 
- Angular Material: Material design for Angular applications.

### Development Setup
To set up the project locally, follow these steps:
- Clone the project to your machine. 
- Run npm install to install the required dependencies for the product.

### Running a Development server
To run a development server, follow these steps:
- Execute ng serve. This will spin up a dev server.
- Navigate to http://localhost:4200/. Any changes made to the source files will automatically reload the application.

In order to fully run the application, you'll also need to clone the backend, install its dependencies (npm install), and run it in another terminal session while the frontend server is running.
Environment Setup

### Environment Setup
To set up the environment variables, create an auth_config.json file in the root directory. Copy the following prototype and fill in the details
  - "domain": "dev-bgg57gfmuzsxtfzv.us.auth0.com"
  - "clientId": "yGWRMFzb1urZSYiGUjhZNXDO2OHoz7L0"
  - "redirect_uri": "http://localhost:4200/products"
  - "audience": "https://nodestorebackend.sample"
