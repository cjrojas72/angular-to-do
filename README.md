# ToDoLister 📝
**A modern, reactive task management app built with Angular 19, Firebase, and Tailwind CSS.**



[Live Demo](https://todolistercr.vercel.app/)

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
   git clone [your-repo-link]
   npm install