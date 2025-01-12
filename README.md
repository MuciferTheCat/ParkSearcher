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
- **Tools**: Swagger (API Documentation), Docker (Containerization), Kubernetes (Orchestration)

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