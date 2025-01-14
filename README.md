## 1. Title Page

### Project Name
**ParkSearcher**

### Overview
ParkSearcher is a parking management application designed to simplify parking space search, beginning and ending of parking, and payment processing. Built using a microservices architecture, it ensures modularity and scalability, providing users with seamless parking experiences.

### Date and Version
- **Version**: 1.0.0
- **Last Updated**: January 2025

---

## 2. Table of Contents
1. Title Page
2. Table of Contents
3. Introduction
4. Architecture
5. Application Workflow

---

## 3. Introduction

### Purpose
ParkSearcher aims to resolve parking challenges by enabling users to search for available parking spaces, start parking sessions, and process payments efficiently. The application leverages a microservices architecture to ensure modular development and scalable deployments.

### Audience
- **Developers**: To understand and contribute to the project.
- **Stakeholders**: To review technical details and workflows.
- **Administrators**: To manage payments and parkings.

### Technologies Used
- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Environment**: Visual Studio Code
- **Tools**: Swagger (API Documentation), Docker (Containerization), Kubernetes (Orchestration), Azure (Deployment), RabbitMQ (Microservice Communication), Passport.js

---

## 4. Architecture

### System Architecture Diagram
A high-level architecture diagram illustrating the microservices and their interactions.

```
+------------------+         +-------------------+
|  UserService     | <-----> |  Authentication   |
|                  |         +-------------------+
|                  |
|  ParkingService  | <-----> |  PaymentService   |
+------------------+         +-------------------+
```

### Microservices Overview
1. **UserService**:
   - Manages user authentication, registration, and profile information.

2. **ParkingService**:
   - Handles parking session management, including adding, updating, and ending sessions.

3. **PaymentService**:
   - Manages payment processing and payment history.

4. **SearchService**:
   - Provides APIs to search for parking spaces based on location and other criteria.

### Communication
- REST APIs for inter-service communication.
- JWT tokens or cookies for authentication and session management.

---

## 5. Application Workflow

### User Workflows

1. **Login and Registration**:
   - Users can register with their details.
   - Login is secured using JWT tokens.

2. **Search Parking**:
   - Users input location coordinates to search for nearby parking spaces.
   - Results include details like name, city, capacity, and fee.

3. **Start Parking**:
   - Users select a parking space and specify the duration of their parking.
   - A session is created and managed via the ParkingService.

4. **Payments**:
   - Users are billed based on the duration and location of their parking.
   - Payment history is maintained by the PaymentService.

5. **User Profile**:
   - Displays user details, active parking sessions, and payment history.
   - Allows users to update their information or end active parking sessions.
  
## 6. Backend Services

### 6.1 APIs
   - API documentation is done in swagger.

### 6.2 Database

    Schema Details: Provide details about the database schema (tables/collections, fields, relationships).
    Data Flow: Explain how data flows between the backend and frontend.

### 6.3 Error Handling

    Document the error codes and their meanings (e.g., 400 Bad Request, 404 Not Found, 500 Server Error).

### 6.4 Logging

    Describe the logging setup (e.g., using Winston or another logger) and what types of events are logged.

## 7. Frontend

### 7.1 Components

    List major components (e.g., Login, Register, Map, UserProfile, Parking).
    Provide an overview of each component’s purpose and where it fits into the workflow.

### 7.2 Styling

    Describe how styling is managed (e.g., CSS, Bootstrap).
    Provide any specific design guidelines or color schemes.

## 8. DevOps

### 8.1 Local Development
   - Clone the repository.
   - Install dependencies using npm install.
   - Set up .env files for environment variables.
   - Run services using npm start or Docker.

### 8.2 Docker
   - Install docker desktop.
   - Login into dockerhub (if you want to rebuild images).

### 8.3 Deployment
   - Download kubectl.
   - Download minikube or login into Azure.
   - If using Azure, create a resource group and a Kubernetes cluster.
   - Deploy each service by executing "helm install <service-name> .\<helm-config-folder-name>\ -f <values>.yaml".
   - Deploy any aditional tools you need with helm (Required: Traefik, RabbitMQ    NotRequired: Prometheus)

## 9. Testing
   - Move to the folder of the microservice you want to test.
   - Run command 'npm test'.

## 10. Security
   - Security is done with JWT tokens.
   - On ceratin routes, there is a security mechanism that does not allow requests without a valid jwt.
   - We are using Passport.js for that.

## 11. Good Practices
   - Using ESLint for preetier code.
   - Folder Structure: Each microservice is separated into its own folder. In its folder there are some important files and then there are folders for model, controller, config and     routes each for their respective file. There is also a folder for helm-chart deployment configuration for that service. 
   - Version Control: The github repository has a master branch and a dev branch. Master is meant for production and dev is meant for development.

## 12. Future Enhancements
   - Option for paying directly through the app.
   - Parking space reservation.
   - More customization for user profiles.

## 13. Appendix
   - Glossary: JWT - Json Web Token.
   - References: 
     - https://github.com/
     - https://www.rabbitmq.com/
     - https://azure.microsoft.com/en-us/
     - https://www.passportjs.org/