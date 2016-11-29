import {TaskQueue} from './task-queue';

describe('TaskQueue', () => {
  let myTaskQueue;
  let firstTask;
  let secondTask;
  let thirdTask;

  beforeEach(() => {
    myTaskQueue = new TaskQueue();

    firstTask = createTaskSpy('firstTask');
    secondTask = createTaskSpy('secondTask');

    function createTaskSpy(name) {
      let task = {};
      task.spy = jasmine.createSpy(name);

      task.spy.and.callFake((done) => {
        task.done = done;
      });

      return task;
    }
  });

  it('should execute the first task', () => {
    myTaskQueue.add(firstTask.spy);
    myTaskQueue.execute();
    expect(firstTask.spy).toHaveBeenCalledWith(firstTask.done);
  });

  it('should not execute the second task if the first is not done', () => {
    myTaskQueue.add(firstTask.spy);
    myTaskQueue.add(secondTask.spy);
    myTaskQueue.execute();
    expect(firstTask.spy).toHaveBeenCalledWith(firstTask.done);
    expect(secondTask.spy).not.toHaveBeenCalled();
  });

  it('should execute the the second task when the first task is done', () => {
    myTaskQueue.add(firstTask.spy);
    myTaskQueue.add(secondTask.spy);
    myTaskQueue.execute();
    firstTask.done();
    expect(firstTask.spy).toHaveBeenCalledWith(firstTask.done);
    expect(secondTask.spy).toHaveBeenCalledWith(secondTask.done);
  });

});
