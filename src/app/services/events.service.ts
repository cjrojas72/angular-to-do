import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  // 1. Define the 'New Todo' channel
  private todoAddedSource = new Subject<void>();
  
  // 2. Expose it as an Observable for components to listen to
  todoAdded$ = this.todoAddedSource.asObservable();

  // 3. The method used to "publish" or "emit" the event
  emitTodoAdded() {
    this.todoAddedSource.next();
  }
}
