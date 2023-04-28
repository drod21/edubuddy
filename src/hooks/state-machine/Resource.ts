// Resource.ts

export class Resource<T = NonNullable<unknown>> {
  private data: T | null;
  private error: Error | null;
  private promise: Promise<T> | null;

  constructor() {
    this.data = null;
    this.error = null;
    this.promise = null;
  }

  read() {
    if (this.error) {
      throw this.error;
    }

    if (this.data) {
      return this.data;
    }

    if (this.promise) {
      throw this.promise;
    }

    throw new Error("Resource not loaded");
  }

  setData(data: T | undefined) {
    this.data = data ?? null;
    this.promise = null;
  }

  setError(error: Error) {
    this.error = error;
    this.promise = null;
  }

  setPromise(promise: Promise<T>) {
    this.promise = promise;
  }
}
