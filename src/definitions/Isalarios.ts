import { Timestamp } from '@firebase/firestore';

export interface Isalarios {
  descripcion?: string;
  fecha?: Timestamp;
  salario?: string;
}
