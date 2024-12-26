# Pipeline Documentation

This document outlines the CI/CD pipeline for deploying the project, including the frontend (Angular), backend (Node.js), and database (PostgreSQL on AWS RDS).

---

## **Pipeline Overview**

The pipeline automates the process of building, testing, and deploying the application. It uses **CircleCI** as the CI/CD platform.

### **Stages**
1. **Source Control**: GitHub repository.
2. **Build**:
  - Angular frontend is built and packaged.
  - Node.js backend is packaged.
3.  **Deploy**:
  - Frontend deployed to AWS S3 (with optional CloudFront).
  - Backend deployed to AWS Elastic Beanstalk.
  - PostgreSQL hosted on AWS RDS for persistent storage.

---

## **Pipeline Steps**

### **1. Build Stage**
#### **Frontend (Angular)**
- **Description**: Build the Angular application into static assets.
- **Commands**:
  ```bash
  npm install
  npm run build
  
- `dist/` directory containing the compiled Angular app

#### **Backend (Elastic Beanstalk)**
- **Description**: Build the Angular application into static assets.
- **Commands**:
  ```bash
  npm install
  npm run build

- `build/` directory containing the compiled Node app

### **2. Deploy Stage**
#### **Frontend (Angular)**
- **Target: AWS S3(Static file hosting - HTML, CSS, JS, Images)**
- Process:
  - Sync `dist/` files to the s3 bucket
  - Command:
    - aws s3 sync dist/ s3://angular-shopping-v1/index.html --exclude "assets/*"

#### **Backend (Nodejs)**
- **Target: AWS Elastic Beanstalk**
- Process:
  - The `.ebignore` has list of files to ignore making it easy to deploy the application on `eb cli`
  - Command:
    - `eb deploy`

### **Diagram**
See the pipeline folder under the `document folder` for the high-level architecture diagram of this pipeline
