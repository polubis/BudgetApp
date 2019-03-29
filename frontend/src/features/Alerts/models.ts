const error = 'error'
const warn = 'warn';
const ok = 'ok';

export type Error = typeof error;
export type Warn = typeof warn;
export type Ok = typeof ok;

export class AlertDefinition {
  constructor(public id: string, public message: string, public type: Error | Warn | Ok, public closeTime: number = 5000) {
  }
}
