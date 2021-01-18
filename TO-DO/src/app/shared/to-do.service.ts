import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Task } from './task';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  tasksCollection: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;
  taskDoc: AngularFirestoreDocument<Task>;

  constructor(public db: AngularFirestore) {
    this.tasksCollection = this.db.collection('to-do-list', (ref) =>
      ref.orderBy('task', 'asc')
    );
    this.tasks = this.tasksCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Task;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getTasks() {
    console.log(this.tasksCollection);
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasksCollection.add(task);
  }
  deleteTask(task: Task) {
    this.taskDoc = this.db.doc(`to-do-list/${task.id}`);
    this.taskDoc.delete();
  }
}
