const error = 'error'
const warn = 'warn';
const ok = 'ok';

type Error = typeof error;
type Warn = typeof warn;
type Ok = typeof ok;

export type AlertDefinition = {
  id: string;
  message: string;
  type: Error | Warn | Ok;
  closeTime?: number;
}
