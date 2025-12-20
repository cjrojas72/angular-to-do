import { inject, Injectable } from '@angular/core';
import { Todo } from '../model/todo.type';
import { FirebaseService } from './firebase.service';
import { AuthService } from './auth.service';
import { collection, addDoc , query, where, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private firebaseService = inject(FirebaseService);
  private authService = inject(AuthService);
  private db = this.firebaseService.db;
  
  private get userId() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error("User must be logged in to perform this action");
    }
    return user.uid;
  }
  

  todoItems: Todo[] = [];

  async getTodos(): Promise<Array<Todo>> {

    this.todoItems = [];

    const q = query(
        collection(this.db, "todos"), 
        where("userId", "==", this.authService.getCurrentUser()?.uid), 
    );

    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          
          const {userId, title, completed, createdAt} = doc.data();

          let todo: Todo = {
          id: doc.id,
          userId: userId,
          title: title,
          completed: completed,
          createdAt: createdAt?.toDate()
          }

        this.todoItems.push(todo);
      });

     

    return this.todoItems;
  }


  async updateTodo( id: string, completedStatus: boolean ): Promise<void>{
      if(!this.userId){
        return console.log("No logged in user");
     }

     const docRef = doc(this.db, "todos", id);

     await updateDoc(docRef, {
      completed: !completedStatus
     })
  }


  async deleteTodo( id: string ): Promise<void>{
    if(!this.userId){
      return console.log("No logged in user");
    }

    const docRef = doc(this.db, "todos", id);
  
    await deleteDoc(docRef);
  }

  
  async addTodo( todo: string): Promise<void>{
    if(!this.userId){
      return console.log("No logged in user");
    }

    try {
      const newTodo = await addDoc(collection(this.db, "todos"), {
        title: todo,
        completed: false,
        createdAt: new Date(),
        userId: this.authService.getCurrentUser()?.uid
      });
      console.log("Document written with ID: ", newTodo.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  }
  
}
