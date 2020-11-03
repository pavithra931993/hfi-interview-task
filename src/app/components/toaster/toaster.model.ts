export class Toast {
  id: string;
  message: string;
  autoClose: boolean;
  duration: number;
  isOpen: boolean = true;
  isMouseHover: boolean = false;
  constructor(init?: Partial<Toast>) {
      Object.assign(this, init);
  }
}