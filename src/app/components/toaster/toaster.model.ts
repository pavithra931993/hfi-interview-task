export class Toast {
  id: string;
  message: string;
  autoClose: boolean;
  duration: number;

  constructor(init?: Partial<Toast>) {
      Object.assign(this, init);
  }
}