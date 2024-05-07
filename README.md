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
Follow these steps to set up the project locally:

- Clone the project to your machine.
- Run npm install to install the required dependencies for the product.

For first time usage, you should log in as an admin, which grants you access to manage the store's products. Here are the steps:

- Log in with the admin credentials provided below.
- Click on the Admin button to navigate to the admin page.
- Click Upload File and upload all product images under the `src -> assets folder -> product-images` to the UploadCloud server.
- Once upload is complete, click Send to Database to populate the PostgreSQL database with the product details.

When you're done setting up products, click on the logo to navigate back to the home page where you can explore the products to purchase.
Note: Once the products have been set up, you can log out of the admin account. Register and sign in as a regular user to browse and purchase items. The admin account is primarily for creating and managing products in the store, which a regular user does not have access to.

### Running a Development server
Follow these steps to run the development server:

- Execute ng serve in a terminal. This will spin up your development server.
- Navigate to http://localhost:4200/ in your web browser. Any changes you make to the source files will automatically cause the application to reload.

To fully run the application, you also need to set up the backend. Clone the backend code from this URL: https://github.com/PaschalO/OnlineShoppingBackend, install its dependencies by running npm install in the terminal, follow the instructions for setup your postgresql and run the backend server `npm run serve` in a separate terminal session alongside the frontend server.


### Environment Setup
To set up the environment variables, create an auth_config.json file in the root directory. Copy the following prototype and fill in the details
  - "domain": "dev-bgg57gfmuzsxtfzv.us.auth0.com"
  - "clientId": "yGWRMFzb1urZSYiGUjhZNXDO2OHoz7L0"
  - "redirect_uri": "http://localhost:4200/products"
  - "audience": "https://nodestorebackend.sample"

### ADMIN CREDENTIALS
To access admin features, use the following credentials to log in:
- email: admin@shoppingfrontend.com
- password: Windows78@
