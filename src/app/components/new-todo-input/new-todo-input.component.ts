import { Component, inject, signal } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../model/todo.type';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-new-todo-input',
  imports: [],
  templateUrl: './new-todo-input.component.html',
  styleUrl: './new-todo-input.component.css'
})
export class NewTodoInputComponent {

  private todoService = inject(TodosService);
  private eventService = inject(EventsService);

  newTodoTitle = signal('');

  async addTodo(){

    let todoTitle = this.newTodoTitle().trim();

    if(!todoTitle){
      return
    }

    await this.todoService.addTodo(todoTitle);
    this.newTodoTitle.set('');

    this.eventService.emitTodoAdded();

    
  }


}
