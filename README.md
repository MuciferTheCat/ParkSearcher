## PROJECT DOCUMENTATION

### Project Name

**ParkSearcher**

### Overview

ParkSearcher is a parking management application designed to simplify parking space search, beginning and ending of parking, and payment processing. Built using a microservices architecture, it ensures modularity and scalability, providing users with seamless parking experiences.

### Date and Version

- **Version**: 1.0.0
- **Last Updated**: January 2025

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Architecture](#2-architecture)
3. [Application Workflow](#3-application-workflow)
4. [Backend Services](#4-backend-services)
5. [Frontend](#5-frontend)
6. [DevOps](#6-devops)
7. [Testing](#7-testing)
8. [Security](#8-security)
9. [Good Practices](#9-good-practices)
10. [Future Enhancements](#10-future-enhancements)
11. [Appendix](#11-appendix)

---

## 1. Introduction

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

## 2. Architecture

### System Architecture Diagram

A high-level architecture diagram illustrating the microservices and their interactions.

```
      +------------------+         +-------------------+
      |  Authentication  | =====>  |    UserService    | <================\\
      +------------------+         +-------------------+                  ||
                                             /\                           ||
                                             ||                           ||
                                             \/                           \/       
      +------------------+         +-------------------+         +-------------------+ 
      |  SearchService   | =====>  |  ParkingService   | <=====> |  PaymentService   |
      +------------------+         +-------------------+         +-------------------+
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

## 3. Application Workflow

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
  
## 4. Backend Services

### APIs

API documentation is done in Swagger and can accessed at `/api`.

### Database

    Schema Details: Provide details about the database schema (tables/collections, fields, relationships).
    Data Flow: Explain how data flows between the backend and frontend.

### Error Handling

    Document the error codes and their meanings (e.g., 400 Bad Request, 404 Not Found, 500 Server Error).

## 5. Frontend

### Components

- `Login`: user can log in to their account
- `Register`: user can create their account
- `Search`: map is displayed on the front page of the app. User can chose to how to find pakring place: based on their location or by manually entering the prefered city. In both cases user can provide search radius around central point.
- `UserProfile`: user can manage their profile. It is devided into two tabs
  - payments: user can se active (not paid) and no-active (already paid) parkings
  - active parking: user can manage their active parking. They can change end time or immediately end their active parking.
    List major components (e.g., Login, Register, Map, UserProfile, Parking).
    Provide an overview of each component’s purpose and where it fits into the workflow.
- `Parking`: user can start their parking. Start and end time can be modified, default value for start time is current time, default value for end time is one hour later

### Styling

Styling is done using Bootstrap. The following color scheme was used: `https://coolors.co/dbb1bc-d3c4e3-8f95d3-89daff-58504a`.

## 6. DevOps

### Local Development

- Requirements: Visual Studio Code (or something similar), Docker, Node.js
- Clone Github repository: `git clone https://github.com/MuciferTheCat/ParkSearcher`
- Install dependencies using `npm install`.
- Set up `.env` files for environment variables.
- Run services using `npm start`.

### Deployment

- Download kubectl.
- Download minikube or login into Azure.
- If using Azure, create a resource group and a Kubernetes cluster.
- Deploy each service by executing `helm install <service-name> .\<helm-config-folder-name>\ -f <values>.yaml`.
- Deploy any aditional tools you need with helm
  - Required: Traefik, RabbitMQ
  - Not required: Prometheus

## 7. Testing

Testing can be done localy. Move to the folder of the prefered microservice and run `npm test`.

## 8. Security

Security is done with JWT tokens. On certain routes there is a security mechanism that doesn't allow requests without a valid JWT. Passport.js was used for that.

## 9. Good Practices

- ESLint was used for prettier code.
- Each microservice is seperated into its own folder, which contain important files. Within each microservice there are seperate folders model, controller, config and routes. It also contains folder for helm-chart deployment. Frontend is implemented in seperate folder, same for serverless function.
- Version Control: the Github repository has master and dev branch. Master is used for production and dev is used for development.

## 10. Future Enhancements

- Option for paying directly through the app.
- Parking space reservation.
- More customization for user profiles.

## 11. Appendix
   - Glossary: JWT - Json Web Token.
   - References: 
     - https://github.com/
     - https://www.rabbitmq.com/
     - https://azure.microsoft.com/en-us/
     - https://www.passportjs.org/