import jQuery from 'jquery';
import Angular from 'angular';
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

  controller(callback) {
    this.digest(callback);
    this.digest((el, elementWithController) => {
      return angular.element(elementWithController)
      .isolateScope().$ctrl;
    });

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
