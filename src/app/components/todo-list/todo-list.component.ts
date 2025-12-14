import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  imports: [DatePipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  
  private initialTodos = [
    { id: 1, title: 'Review Angular Signals & Immutability', completed: true, createdAt: new Date(Date.now() - 86400000) },
    { id: 2, title: 'Plan the weekly schedule', completed: false, createdAt: new Date(Date.now() - 3600000) },
    { id: 3, title: 'Buy groceries (milk, eggs, bread)', completed: false, createdAt: new Date() },
  ]
  
  todos = signal(this.initialTodos)
}
