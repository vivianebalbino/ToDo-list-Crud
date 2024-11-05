import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  tasks: any[] = [];
  showTaskForm = false;
  taskToEdit: any = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Carregar tarefas da API
  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  // Adicionar nova tarefa
  addTask(): void {
    this.showTaskForm = true;
    this.taskToEdit = null;
  }

  // Salvar tarefa
  saveTask(task: any): void {
    debugger;
    console.log('Saving task:', task);
    if (this.taskToEdit) {
      // Editando uma tarefa existente
      this.taskService.updateTask(this.taskToEdit._id, task).subscribe(() => {
        this.loadTasks();  // Recarregar as tarefas
        this.showTaskForm = false;
      });
    } else {
      // Criando uma nova tarefa
      this.taskService.addTask(task).subscribe(() => {
        this.loadTasks();  // Recarregar as tarefas
        this.showTaskForm = false;
      });
    }
  }

  // Editar uma tarefa
  editTask(index: number): void {
    debugger;
    this.taskToEdit = { ...this.tasks[index] };
    this.showTaskForm = true;
  }

  // Remover tarefa
  removeTask(index: number): void {
    const taskId = this.tasks[index]._id;
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();  // Recarregar as tarefas
    });
  }

  // Cancelar o formulário
  cancelTaskForm(): void {
    this.showTaskForm = false;
    this.taskToEdit = null;
  }
}