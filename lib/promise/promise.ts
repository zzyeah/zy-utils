export enum PromiseState {
    pending = "pending",
    fulfilled = "fulfilled",
    rejected = "rejected",
  }
  export type OnFullFilled = (value: any) => any | PromiseLike<any>;
  export type OnRejected = (reason: any) => PromiseLike<any>;
  export type Executor<T extends Omit<PromiseState,  PromiseState.pending>> =
    T extends PromiseState.fulfilled
      ? OnFullFilled
      : T extends PromiseState.rejected
      ? OnRejected
      : OnFullFilled;
  export type HandlerState = Omit<PromiseState, PromiseState.pending>;
  export interface Handler<T extends HandlerState> {
    executor: Executor<T>;
    state: T;
    resolve: any;
    reject: any;
  }
  
  function runMicroTask(callback: any) {
    if (process?.nextTick) {
      return process.nextTick(callback);
    } else if (MutationObserver) {
      const p = document.createElement("p");
      const observer = new MutationObserver(callback);
      observer.observe(p, {
        childList: true,
      });
      p.innerHTML = "1";
    } else {
      setTimeout(() => {
        callback;
      }, 0);
    }
  }
  
  /**
   * 判断一个数据是否是ZyPromise
   * @param obj
   * @returns
   */
  function isPromise(obj) {
    return !!(obj && typeof obj === "object" && typeof obj.then === "function");
  }
  
  export class ZyPromise {
    private _state: PromiseState = PromiseState.pending;
    private _value = undefined;
    private _handlers: Handler<HandlerState>[] = []; // 处理函数形成的队列
    constructor(executor: (resolve, reject) => any) {
      try {
        executor(this._resolve.bind(this), this._reject.bind(this));
      } catch (error) {
        this._reject(error);
      }
    }
    private _changeState(newState: PromiseState, value: any) {
      if (this._state !== PromiseState.pending) return;
      this._state = newState;
      this._value = value;
      this._runHandlers();
    }
    private _resolve(data: any) {
      // 改变状态
      this._changeState(PromiseState.fulfilled, data);
    }
    private _reject(reason: any) {
      // 改变状态
      this._changeState(PromiseState.rejected, reason);
    }
  
    /**
     *
     * @param executor
     * @param state
     * @param resolve 让then函数返回的Promise成功
     * @param reject 让then函数返回的Promise失败
     */
    private _pushHandler<T extends HandlerState>(
      executor: Executor<T>,
      state: T,
      resolve,
      reject
    ) {
      this._handlers.push({
        executor,
        state,
        resolve,
        reject,
      });
    }
  
    private _runHandlers() {
      if (this._state === PromiseState.pending) {
        return;
      }
      while (this._handlers[0]) {
        const handler = this._handlers[0];
        this._runOneHandler(handler);
        this._handlers.shift();
      }
    }
  
    private _runOneHandler<T extends HandlerState>({
      state,
      executor,
      resolve,
      reject,
    }: Handler<T>) {
      runMicroTask(() => {
        if (this._state !== state) {
          // 状态不一致
          return;
        }
        if (typeof executor !== "function") {
          // 传递后续处理并非一个函数
          this._state === PromiseState.fulfilled
            ? resolve(this._value)
            : reject(this._value);
        }
        try {
          const result = executor(this._value);
          if (isPromise(result)) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      });
    }
  
    public then(onFullFilled?: OnFullFilled, onRejected?: OnRejected) {
      return new ZyPromise((resolve, reject) => {
        if (onFullFilled) {
          this._pushHandler(
            onFullFilled,
            PromiseState.fulfilled,
            resolve,
            reject
          );
        }
        if (onRejected) {
          this._pushHandler(onRejected, PromiseState.rejected, resolve, reject);
        }
  
        this._runHandlers();
      });
    }
  
    public catch(onRejected?: OnRejected) {
      return this.then(undefined, onRejected);
    }
  
    public finally(onSettled) {
      return this.then(
        (data) => {
          onSettled();
          return data;
        },
        (reason) => {
          onSettled();
          throw reason;
        }
      );
    }
  }
  