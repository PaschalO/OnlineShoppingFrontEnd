# Application Dependencies

This document outlines the dependencies required for the application to function, including frontend, backend, database, and deployment dependencies.

---

## **Frontend (Angular) Dependencies**

### **Core Dependencies**
1. **Angular Framework**:
  - **Version**: 16.0 (or as specified in `package.json`)
  - **Purpose**: Provides the core structure for the Angular application.
2. **RxJS**:
  - **Version**: 7.8.0
  - **Purpose**: Manages asynchronous operations and event streams.

### **Third-Party Libraries**
1. **Angular Material**:
  - **Version**: 16.1.7
  - **Purpose**: Provides responsive styling and reusable UI components.
2. **Prettier**:
  - **Version**: 3.2.5
  - **Purpose**: Ensures consistent code formatting across a codebase.
3. **Auth0 Angular SDK**:
  - **Package Name**: `@auth0/auth0-angular`
  - **Purpose**: Handles authentication and authorization via Auth0.

### **Build Tools**
1. **Node.js**:
  - **Version**: 18.0
  - **Purpose**: Required for running build tools and package management.
2. **Angular CLI**:
  - **Version**: 14.x
  - **Purpose**: Build and manage Angular projects.
3. **NPM (Node Package Manager)**:
  - **Version**: 9.5.1
  - **Purpose**: Manages JavaScript dependencies.
---

## **Backend (Node.js) Dependencies**

### **Core Dependencies**
1. **Express.js**:
  - **Version**: 4.17.1
  - **Purpose**: Web server framework for handling HTTP requests and routing.
2. **PostgreSQL Client**:
  - **Package Name**: `pg`
  - **Version**: 8.5.1
  - **Purpose**: Interacts with the PostgreSQL database.

### **Authentication**
1. **Auth0 Node SDK**:
  - **Package Name**: `express-oauth2-bearer`
  - **Purpose**: Validates JSON Web Tokens (JWT) for authentication.

### **Utility Libraries**
1. **Dotenv**:
  - **Version**: 16.x
  - **Purpose**: Loads environment variables from `.env` files.
2. **Cors**:
  - **Version**: 2.8.5
  - **Purpose**: Enables cross-origin resource sharing.
3. **Body-Parser**:
  - **Version**: 1.19.0
  - **Purpose**: Parses incoming request bodies (e.g., JSON, URL-encoded).
4.  **Typescript**:
  - **Version**: 5.0.4
  - **Purpose**: Adds static typing to the language, making it more predictable and easier to debug.
5.  **Eslint**:
  - **Version**: 8.45.0
  - **Purpose**: Analyzes your code for potential errors, stylistic issues, and code quality problems.
6.  **Nodemon**:
  - **Version**: 3.0.1
  - **Purpose**: Restarts your application whenever files are changed, improving the developer experience.

## **Database Dependencies**

### **PostgreSQL**
- **Version**: 16.9
- **Purpose**: Relational database for storing application data.
- **Features**:
  - Primary Key Constraints
  - Foreign Key Relationships
  
---

## **Deployment Dependencies**

### **Frontend Deployment**
1. **AWS S3**:
  - Purpose: Hosts the Angular application as a static website.

### **Backend Deployment**
1. **AWS Elastic Beanstalk**:
  - Purpose: Deploys and manages the Node.js backend application.
2. **AWS IAM Roles**:
  - Purpose: Manages permissions for accessing AWS services (e.g., S3, RDS).

---

## **Version Management**

### **Tools**
1. **NVM (Node Version Manager)**:
  - Ensures consistent Node.js versions across environments.
2. **Package.json**:
  - Manages dependency versions and scripts.

---

### WEBSITE

See link to view the final product - https://angular-shopping-v1.s3.ca-central-1.amazonaws.com/index.html

