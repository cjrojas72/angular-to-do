import { Component } from '@angular/core';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';
import { AppComponent } from "../../app.component";

@Component({
  selector: 'app-home',
  imports: [TodoListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
