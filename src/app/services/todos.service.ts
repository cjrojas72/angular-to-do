import { inject, Injectable } from '@angular/core';
import { Todo } from '../model/todo.type';
import { FirebaseService } from './firebase.service';


@Injectable({
  providedIn: 'root'
})
export class TodosService {

  firebaseService = inject(FirebaseService)

  todoItems: Todo[] = [
    { 
      userId: 1, 
      id: 1, 
      title: 'Review Angular Signals & Immutability', 
      completed: true, 
      createdAt: new Date(Date.now() - 86400000) 
    },
    { 
      userId: 1, 
      id: 2, 
      title: 'Plan the weekly schedule', 
      completed: false, 
      createdAt: new Date(Date.now() - 3600000) 
    },
    { 
      userId: 1, 
      id: 3, 
      title: 'Buy groceries (milk, eggs, bread)', 
      completed: false, 
      createdAt: new Date() 
    },
  ]



  getTodos(){
    return this.todoItems
  }

  updateTodo( id: number): void{
    let todoItem = this.todoItems.find( todo => todo.id === id)


    if(todoItem){
      todoItem.completed = !todoItem.completed
    }
  }

  deleteTodo( id: number): void{
    this.todoItems = this.todoItems.filter(todo => todo.id !== id)

  }

  addTodo( todo: Todo ): void {
    this.todoItems.push(todo)
  }

  getFireBase(){
    this.firebaseService.getFirebase();
  }
  
}
