# Infrastructure Requirements

This document outlines the infrastructure requirements for the deployment of our application, which includes the frontend (Angular hosted on S3), backend (Node.js on Elastic Beanstalk), and database (PostgreSQL on AWS RDS).

---

## **1. Amazon S3**
Amazon S3 is used to host the static frontend assets for the Angular application.

### **Details**
- **Purpose**: Host static website files (HTML, CSS, JS, Images).
- **Region**: `ca-central-1` (can be adjusted based on proximity to users).
- **Bucket Name**: `angular-shopping-v1`

## **2. AWS RDS (PostgreSQL)**
AWS RDS hosts the PostgreSQL database used by the backend API.

### **Details**
- **Engine**: PostgreSQL
- **Version**: 16.0
- **Instance Type**: `db.t4g.micro`
- **Region**: `ca-central-1b`
- **Storage**:
  - **Type**: General Purpose SSD (GP2)
  - **Size**: 20 GB (initially, scalable as needed)
- **Region**: `ca-central-1`
---

## **3. AWS Elastic Beanstalk**
AWS Elastic Beanstalk is used to deploy and manage the Node.js API backend.

### **Details**
- **Platform**: Node.js 20 running on 64bit Amazon Linux 2
- **Region**: `ca-central-1b`
- **Environment Type**: Single instance
- **Scaling**:
  - 0 (No load balancer, No auto scaling)
- **Storage**:
  - Root Volume: 10 GB (General Purpose SSD)
- **Monitoring**:
  - Integrated with Amazon CloudWatch for logs and performance metrics.

## **4. Additional Considerations**

### **Networking**
- **VPC**:
  - All resources (RDS, Elastic Beanstalk) are hosted within a private VPC.
- **Security Groups**:
  - Allow inbound traffic to the Elastic Beanstalk on ports 80 and 443.
  - Allow Elastic Beanstalk instances to connect to RDS on port 5432.

## **5. Diagram**
See the infrastructure folder under the `document folder` for the high-level architecture diagram of this infrastructure:
