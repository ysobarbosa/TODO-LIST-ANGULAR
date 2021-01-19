import { Component, OnInit } from '@angular/core';

import { ToDoService } from '../shared/to-do.service';
import { Task } from '../shared/task';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {
  task: Task = {
    task: '',
    done: false,
  };

  tasks: Task[];
  editState: boolean = false;
  itemToEdit: Task;
  sortedTasks: Task[];

  constructor(private _taskService: ToDoService) {}

  ngOnInit() {
    this._taskService.getTasks().subscribe((tasks) => {
      tasks.sort((a, b) => +b.done - +a.done || a.task.localeCompare(b.task));
      this.tasks = tasks;
    });
  }

  addTask() {
    if (this.task.task != '') {
      this._taskService.addTask(this.task);
      this.task.task = '';
    }
  }

  deleteTask(task) {
    this._taskService.deleteTask(task);
  }

  setDone(task) {
    this._taskService.taskDone(task);
  }
  unsetDone(task) {
    this._taskService.taskDone(task);
  }
}
