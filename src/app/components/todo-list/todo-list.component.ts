import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal, computed } from '@angular/core';
import { NewTodoInputComponent } from '../new-todo-input/new-todo-input.component';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../model/todo.type';
import { EventsService } from '../../services/events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  imports: [DatePipe, NewTodoInputComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit, OnDestroy{
  
  todoService = inject(TodosService)
  todoItems = signal(<Array<Todo>>([]))

  private eventService = inject(EventsService)
  private subscription!: Subscription

  // private initialTodos = [
  //   { id: 1, title: 'Review Angular Signals & Immutability', completed: true, createdAt: new Date(Date.now() - 86400000) },
  //   { id: 2, title: 'Plan the weekly schedule', completed: false, createdAt: new Date(Date.now() - 3600000) },
  //   { id: 3, title: 'Buy groceries (milk, eggs, bread)', completed: false, createdAt: new Date() },
  // ]

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id)
    this.getTodos()
  }

  toggleCompleted(id: string) {
    this.todoService.updateTodo(id)
    this.getTodos()
  }

  async getTodos(){
    const todos = await this.todoService.getTodos()

    this.todoItems.set(this.getSortedList(todos))

    //console.log(this.todoItems())
    
  }

  getSortedList(list: Todo[]) {
    if (!list) return []

    return [...list].sort((a, b) => {
      const timeA = a.createdAt?.getTime() ?? 0
      const timeB = b.createdAt?.getTime() ?? 0

      return timeB - timeA; // Newest first
    });
  }


 
  ngOnInit(): void {
    this.getTodos()

    this.subscription = this.eventService.todoAdded$.subscribe(() => {
      console.log('Event Service notified us! Refreshing...')
      this.getTodos()
    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  
}
