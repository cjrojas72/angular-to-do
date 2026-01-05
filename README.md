# ToDoLister (todolister)

A simple Angular to-do app with Firebase authentication and persistence. Features:
- Add todos
- Delete todos
- Login with Google or email/password (Firebase)
- Update password from Profile / Settings

## Live / Deploy
Deployed as: `todolister` https://todolistercr.vercel.app/

## Tech
- Angular
- Firebase Auth & Firestore
- Tailwind CSS

## Quick Start

1. Install
```sh
npm install
```

2. Run dev server
```sh
ng serve
# then open http://localhost:4200
```

3. Build for production
```sh
ng build
```

4. Tests
```sh
ng test
```

## Firebase
Firebase config is stored in:
- `angular-to-do/src/environments/environment.development.ts`
- `angular-to-do/src/environments/environment.ts`

Make sure to configure a Firebase project with Authentication (Email/Password and Google) and Firestore.

## Auth flows

- Email sign-up: handled in the signup page.
- Google sign-in: via Google popup.
- Password reset: "Forgot password" sends reset email.
- Update password: Profile page reauthenticates then updates password.

## Important files (open in workspace)

- Todos data and CRUD:
  - [`TodosService`](angular-to-do/src/app/services/todos.service.ts) — angular-to-do/src/app/services/todos.service.ts
  - [`Todo` type](angular-to-do/src/app/model/todo.type.ts) — angular-to-do/src/app/model/todo.type.ts

- UI components:
  - [`NewTodoInputComponent`](angular-to-do/src/app/components/new-todo-input/new-todo-input.component.ts) — angular-to-do/src/app/components/new-todo-input/new-todo-input.component.ts
  - [`TodoListComponent`](angular-to-do/src/app/components/todo-list/todo-list.component.ts) — angular-to-do/src/app/components/todo-list/todo-list.component.ts
  - Header: `angular-to-do/src/app/components/header/header.component.ts`

- Auth & Firebase:
  - [`AuthService`](angular-to-do/src/app/services/auth.service.ts) — angular-to-do/src/app/services/auth.service.ts
  - [`FirebaseService`](angular-to-do/src/app/services/firebase.service.ts) — angular-to-do/src/app/services/firebase.service.ts
  - Login/Signup/Profile pages:
    - [`LoginComponent`](angular-to-do/src/app/pages/login/login.component.ts) — angular-to-do/src/app/pages/login/login.component.ts
    - [`SignupComponent`](angular-to-do/src/app/pages/signup/signup.component.ts) — angular-to-do/src/app/pages/signup/signup.component.ts
    - [`ProfileComponent`](angular-to-do/src/app/pages/profile/profile.component.ts) — angular-to-do/src/app/pages/profile/profile.component.ts

## How it works (high level)
- Todos persisted in Firestore; `TodosService` performs add, delete, and update by user.
- `AuthService` wraps Firebase Auth (email/password & Google).
- Profile page reauthenticates user and calls `AuthService.updateUserPassword`.


## License
MIT