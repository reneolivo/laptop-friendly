export class TaskQueue {
  constructor() {
    this.currentTask = null;
    this.lastTask = null;
  }

  add(taskCallback) {
    const task = new TaskNode(taskCallback);

    if (this.currentTask) {
      this.addLastTask(task);
    } else {
      this.addFirstTask(task);
    }
  }

  addFirstTask(task) {
    this.currentTask = task;
    this.lastTask = task;
  }

  addLastTask(task) {
    this.lastTask.next = task;
    this.lastTask = task;
  }

  execute() {
    if (this.currentTask === null) return;

    this.currentTask.execute(() => {
      if (this.currentTask === null) return;

      this.currentTask = this.currentTask.next;

      this.execute();
    });
  }
}

export class TaskNode {
  constructor(taskCallback) {
    this.taskCallback = taskCallback;
    this.next = null;
  }

  execute(done = () => {}) {
    this.taskCallback(done);
  }
}
