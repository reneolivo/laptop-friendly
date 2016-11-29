import jQuery from 'jquery';
import {TaskQueue} from '../structures/task-queue';

export class DigestQueue {
  constructor(element, scope) {
    this.element = jQuery(element);
    this.scope = scope;
    this.lastResult = undefined;

    this._createTaskQueue();
  }

  digest(callback) {
    this.taskQueue.add((done) => {
      this.lastResult = callback(
        this.element,
        this.lastResult
      );

      this._scopeDigest(done);
    });

    this.taskQueue.execute();

    return this;
  }

  _createTaskQueue() {
    this.taskQueue = new TaskQueue();
    this.taskQueue.add((done) => this._scopeDigest(done));
  }

  _scopeDigest(done) {
    setTimeout(() => {
      this.scope.$digest();
      done();
    });
  }
}
