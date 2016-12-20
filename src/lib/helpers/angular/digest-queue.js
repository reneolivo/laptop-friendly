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

  controller(callback = false) {
    if (typeof callback !== 'function') {
      this._getRootController();
    } else {
      this._getChildController(callback);
    }

    return this;
  }

  find(elementName) {
    this.digest((el) => el.find(elementName));

    return this;
  }

  click(elementName) {
    this.find(elementName);

    this.digest((el, child) => {
      child.click();
      return child;
    });

    return this;
  }

  sendKeys(inputPath, value) {
    this.find(inputPath);

    this.digest((el, input) => {
      input.val(value);
      input.trigger('input');
      input.trigger('blur');
    });

    return this;
  }

  _getRootController() {
    this.digest((el) => {
      return angular.element(el).isolateScope().$ctrl;
    });
  }

  _getChildController(callback) {
    this.digest(callback);
    this.digest((el, elementWithController) => {
      return angular.element(elementWithController)
      .isolateScope().$ctrl;
    });
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
