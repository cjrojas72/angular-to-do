import { inject, Injectable } from '@angular/core';
import { Todo } from '../model/todo.type';
import { FirebaseService } from './firebase.service';
import { AuthService } from './auth.service';
import { collection, addDoc , query, where, getDocs, orderBy } from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class TodosService {

  firebaseService = inject(FirebaseService)
  authService = inject(AuthService)

  currentUser$ = this.authService.getCurrentUser()
  db = this.firebaseService.db

  todoItems: Todo[] = [
    { 
      userId: "1", 
      id: "1", 
      title: 'Review Angular Signals & Immutability', 
      completed: true, 
      createdAt: new Date(Date.now() - 86400000) 
    },
    { 
      userId: "1", 
      id: "2", 
      title: 'Plan the weekly schedule', 
      completed: false, 
      createdAt: new Date(Date.now() - 3600000) 
    },
    { 
      userId: "1", 
      id: "3", 
      title: 'Buy groceries (milk, eggs, bread)', 
      completed: false, 
      createdAt: new Date() 
    },
  ]



  // getTodos(){
  //   return this.todoItems
  // }

  async getTodos(): Promise<Array<Todo>> {

    this.todoItems = []

    const q = query(
        collection(this.db, "todos"), 
        where("userId", "==", this.authService.getCurrentUser()?.uid), 
    );

    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          //console.log(`${doc.id} => ${JSON.stringify(doc.data())} user`);
          const {userId, title, completed, createdAt} = doc.data()

          let todo: Todo = {
          id: doc.id,
          userId: userId,
          title: title,
          completed: completed,
          createdAt: createdAt?.toDate()
          }

        this.todoItems.push(todo)
      });

      console.log(this.todoItems)

    return this.todoItems
  }


  updateTodo( id: string): void{
    if(!this.currentUser$){
      return console.log("No logged in user")
    }

    let todoItem = this.todoItems.find( todo => todo.id === id)


    if(todoItem){
      todoItem.completed = !todoItem.completed
    }
  }

  deleteTodo( id: string): void{
    if(!this.currentUser$){
      return console.log("No logged in user")
    }

    this.todoItems = this.todoItems.filter(todo => todo.id !== id)

  }

  // addTodo( todo: Todo ): void {
  //   if(!this.currentUser$){
  //     return console.log("No logged in user")
  //   }
    
  //   this.todoItems.push(todo)
  // }
  async addTodo( todo: string): Promise<void>{
    if(!this.currentUser$){
      return console.log("No logged in user")
    }

    try {
      const newTodo = await addDoc(collection(this.db, "todos"), {
        title: todo,
        completed: false,
        createdAt: new Date(),
        userId: this.authService.getCurrentUser()?.uid
      });
      console.log("Document written with ID: ", newTodo.id)
    } catch (e) {
      console.error("Error adding document: ", e)
      throw e;
    }
  }
  
}
