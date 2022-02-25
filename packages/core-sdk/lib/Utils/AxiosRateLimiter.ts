export class AxiosConcurrencyHandler {
  public requests: Record<string, number> = {};
  constructor(private maxRequests = 5, private ttlInterval = 1000) {}
  private getSecondTimestamp() {
    return `${Math.floor(Date.now() / 1000)}`;
  }
  get mode(): string {
    return `${this.maxRequests} requests per ${this.ttlInterval}ms`;
  }
  get pendingRequests(): number {
    const ts = this.getSecondTimestamp();

    if (!this.requests[ts]) {
      this.requests[ts] = 0;
    }

    return this.requests[ts];
  }

  incPendingReq(): void {
    if (!this.requests[this.getSecondTimestamp()]) {
      this.requests[this.getSecondTimestamp()] = 1;
      return;
    }

    this.requests[this.getSecondTimestamp()]++;
  }

  decPendingRequest(): void {
    if (!this.requests[this.getSecondTimestamp()]) {
      this.requests[this.getSecondTimestamp()] = 0;
    }
    const pending = this.requests[this.getSecondTimestamp()];

    this.requests[this.getSecondTimestamp()] = Math.max(0, pending);
  }

  setLimiterOn(axiosInstance: any): void {
    axiosInstance.interceptors.request.use((config: any) => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (this.pendingRequests < this.maxRequests) {
            this.incPendingReq();
            clearInterval(interval);
            resolve(config);
          }
        }, this.ttlInterval);
      });
    });

    axiosInstance.interceptors.response.use(
      (response: any) => {
        this.decPendingRequest();
        return Promise.resolve(response);
      },
      (error: any) => {
        this.decPendingRequest();
        return Promise.reject(error);
      }
    );
  }
}
