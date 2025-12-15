import { Component, inject, signal } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../model/todo.type';

@Component({
  selector: 'app-new-todo-input',
  imports: [],
  templateUrl: './new-todo-input.component.html',
  styleUrl: './new-todo-input.component.css'
})
export class NewTodoInputComponent {

  todoService = inject(TodosService)
  newTodoTitle = signal('')
  
  tempId = Math.floor(Math.random() * 2000)
  tempUser = 5

  addTodo(){

    let todoTitle = this.newTodoTitle().trim()

    if(!todoTitle){
      return
    }

    const newTodo: Todo = {
      id: this.tempId,
      userId: this.tempUser,
      title: todoTitle,
      completed: false,
      createdAt: new Date(),
    };

    // console.log(newTodo)
    this.todoService.addTodo(newTodo)
    this.newTodoTitle.set('')
    
  }


}
