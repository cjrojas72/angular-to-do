# ToDoLister 📝
**A modern, reactive task management app built with Angular 19, Firebase, and Tailwind CSS.**

[Live Demo](https://todolistercr.vercel.app/)

<img width="500" height="500" alt="Screenshot 2026-01-13 232235" src="https://github.com/user-attachments/assets/24729c52-c005-46fb-91d7-ef4270cec1b3" />

<img width="500" height="500" alt="Screenshot 2026-01-13 232427" src="https://github.com/user-attachments/assets/3f7ef4e6-4d5e-4437-b44c-6f31548cfdfe" />

<img width="500" height="500" alt="Screenshot 2026-01-13 232447" src="https://github.com/user-attachments/assets/ecb6679f-0b1c-4c93-a87f-681c8e6ba5b2" />

## 🚀 Key Features
* **Reactive State:** Managed using **Angular Signals** for optimal performance.
* **Firebase Integration:** Real-time persistence with Firestore and secure Auth (Google & Email/Pass).
* **Security:** Re-authentication flows for sensitive actions like password updates.
* **Fully Responsive:** Built with Tailwind CSS for mobile and desktop efficiency.

## 🛠 Tech Stack
* **Frontend:** Angular (Signals, standalone components)
* **Backend/Auth:** Firebase (Firestore, Auth)
* **Styling:** Tailwind CSS
* **Deployment:** Vercel

## 🏗 High-Level Architecture


The app follows a service-based architecture:
- `AuthService`: Manages user sessions and Firebase Auth states.
- `TodosService`: Handles CRUD operations via Firestore with optimistic UI updates.
- `FirebaseService`: Centralized configuration and initialization.

## 🚦 Quick Start
1. **Clone & Install**
   ```bash
   git clone git@github.com:cjrojas72/angular-to-do.git

   npm install
