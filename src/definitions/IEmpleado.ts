export interface IEmpleado {
  id?: string;
  nombres?: string;
  apellidos?: string;
  dpi?: number | null;
  correo?: string;
  nit?: string;
  nacimiento?: any;
  genero?: string;
  direccion?: string;
  telefono?: number;
  departamento?: string;
  departamentoId?: string;
  puesto?: string;
  puestoId?: string;
  jornada?: string;
  sueldo?: number;
  periodo_pago?: string;
  fecha_ingreso?: any;
  estado?: string;
  banco_cuenta?: string;
  tipo_cuenta?: string;
  banco?: string;
  bancoId?: string;
}
