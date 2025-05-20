# Software Requirements Specification (SRS) Report for DocGenie

## 1. Introduction

### Project Overview (Requirements as a User Story)

As a **patient**, I want to **book an appointment with a doctor** based on specialization and availability so that I can **receive medical consultation efficiently**.
As a **doctor**, I want to **manage my schedule and appointments** so that I can **effectively serve my patients**.
As an **admin**, I want to **monitor and manage users and system functionalities** to ensure **a smooth and secure experience**.

### Purpose and Scope

DocGenie is an **AI-powered doctor appointment system** that simplifies the process of booking medical consultations. It connects patients with doctors based on availability, specialization, and preferences. The AI chatbot helps users find suitable doctors by analyzing symptoms and providing recommendations. The system ensures **efficient appointment scheduling, real-time updates, and automated notifications**.

### Stakeholders

- **Primary Stakeholders**: Patients, Doctors, System Admins
- **Secondary Stakeholders**: Healthcare Organizations, Insurance Providers

## 2. Requirements Engineering Process

### 2.1 Stakeholder Needs & Analysis

#### Identify Primary and Secondary Stakeholders

- **Primary Stakeholders:**
  - Patients (users who book doctor appointments)
  - Doctors (users providing medical consultations)
  - System Administrators (manage users and security settings)
- **Secondary Stakeholders:**
  - Healthcare Organizations (potential integration for hospital management)
  - Insurance Providers (for possible insurance verification in future iterations)

#### Methods Used for Requirement Elicitation

- **Surveys** (to gather user expectations from patients and doctors)
- **Interviews** (with healthcare professionals to understand workflow requirements)
- **Brainstorming Sessions** (among developers and stakeholders to finalize key features)

### 2.2 List of Requirements

#### Functional Requirements (FRs)

1. **User Authentication**: Patients and doctors must be able to register and log in securely.
2. **Doctor Profile Management**: Doctors should manage their profiles, including specialization and availability.
3. **Appointment Scheduling**: Patients should be able to book, reschedule, or cancel appointments.
4. **AI Chatbot Assistance**: A chatbot should guide patients in selecting doctors based on symptoms.
5. **Automated Notifications**: Email/SMS reminders for upcoming appointments.
6. **Search & Filter Functionality**: Patients should find doctors based on specialization and location.
7. **Admin Panel**: Admins should be able to monitor activities and manage users.

#### Non-Functional Requirements (NFRs)

1. **Security**: Use JWT for secure authentication and encryption for sensitive data.
2. **Performance**: Ensure real-time appointment scheduling without delays.
3. **Scalability**: Support multiple users simultaneously without performance degradation.
4. **Usability**: The interface should be intuitive and accessible for all age groups.
5. **Availability**: System uptime should be at least 99.5%.

#### Extra-Ordinary Requirements (Wow Factors)

- AI-driven doctor recommendations based on user symptoms.
- Smart scheduling to suggest alternative time slots in case of conflicts.
- Predictive analytics for patient history and appointment trends.

### 2.3 House of Quality (QFD Integration)

#### Customer Requirements (CRs) List

1. Easy appointment booking
2. AI-based doctor recommendations
3. Secure authentication and data privacy
4. Real-time schedule updates
5. Automated reminders
6. Intuitive user interface

#### Engineering Requirements (TRs) List

1. Implement AI chatbot with OpenAI API
2. Secure authentication via JWT
3. Database optimization for fast retrieval
4. Notification system via email/SMS
5. Responsive UI using React.js
6. Cloud deployment on AWS

#### QFD Matrix (House of Quality)

| CRs / TRs             | AI Chatbot | JWT Auth | Database Optimization | Notifications | Responsive UI | AWS Deployment |
| --------------------- | ---------- | -------- | --------------------- | ------------- | ------------- | -------------- |
| Easy Booking          | Strong     | Medium   | Strong                | Medium        | Strong        | Medium         |
| AI Recommendations    | Strong     | Weak     | Strong                | Weak          | Medium        | Weak           |
| Secure Authentication | Weak       | Strong   | Strong                | Weak          | Medium        | Medium         |
| Real-Time Updates     | Medium     | Medium   | Strong                | Strong        | Strong        | Strong         |
| Automated Reminders   | Weak       | Weak     | Medium                | Strong        | Medium        | Strong         |
| Intuitive UI          | Medium     | Weak     | Medium                | Weak          | Strong        | Medium         |

**Legend:**

- **Strong**: High correlation
- **Medium**: Moderate correlation
- **Weak**: Low correlation

DocGenie aims to **streamline the doctor appointment process** through AI-driven recommendations, **secure authentication, and seamless scheduling**. The outlined SRS ensures a structured approach toward its development and deployment.
