import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { NewTodoInputComponent } from '../new-todo-input/new-todo-input.component';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../model/todo.type';

@Component({
  selector: 'app-todo-list',
  imports: [DatePipe, NewTodoInputComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit{
  
  todoService = inject(TodosService)
  todoItems = signal(<Array<Todo>>([]))

  // private initialTodos = [
  //   { id: 1, title: 'Review Angular Signals & Immutability', completed: true, createdAt: new Date(Date.now() - 86400000) },
  //   { id: 2, title: 'Plan the weekly schedule', completed: false, createdAt: new Date(Date.now() - 3600000) },
  //   { id: 3, title: 'Buy groceries (milk, eggs, bread)', completed: false, createdAt: new Date() },
  // ]

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id)
    this.getTodos()
  }

  toggleCompleted(id: number) {
    this.todoService.updateTodo(id)
    this.getTodos()
  }

  getTodos(){
    this.todoItems.set(this.todoService.getTodos())
  }

  getFirebase(){
    this.todoService.getFireBase()
  }


  ngOnInit(): void {
    this.getTodos()
    this.getFirebase()
  }
  
}
