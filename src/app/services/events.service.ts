import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private todoAddedSource = new Subject<void>();
  
  todoAdded$ = this.todoAddedSource.asObservable();

  emitTodoAdded() {
    this.todoAddedSource.next();
  }
}
