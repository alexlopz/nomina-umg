import { Button, Col, Row, Select } from '@paljs/ui';
import CustomSpinner from 'components/CustomSpinner';
import { IEmpleado } from 'definitions/IEmpleado';
import { IPlainObject } from 'definitions/IPlainObjects';
import { useEffect, useState } from 'react';
import { ButtonWrap, InputWrap, SelectWrap } from './style';

const HorasExtrasForm: React.FC<IPlainObject> = ({
  empleados,
  handleSubmit,
  handleChange,
  handleFechaChange,
  handleSelectChange,
  loading,
}) => {
  const [datos, setDatos] = useState<any[]>([]);
  const generarDatos = () => {
    const valores: any = [];
    empleados.map((empleado: IEmpleado) => {
      const value = {
        label: `${empleado.nombres} ${empleado.apellidos}`,
        value: empleado.id,
      };
      valores.push(value);
      setDatos(valores);
    });
  };

  useEffect(() => {
    generarDatos();
  }, [empleados]);

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Empleado:</label>
          <SelectWrap>
            <Select options={datos} placeholder="Empleado" name="empleado" onChange={handleSelectChange} required />
          </SelectWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Descripcion:</label>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Descripcion" name="descripcion" onChange={handleChange} required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Fecha de evento:</label>
          <InputWrap fullWidth size="Medium">
            <input type="date" placeholder="Fecha" name="fecha" onChange={handleFechaChange} required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Horas trabajadas:</label>
          <InputWrap fullWidth size="Medium">
            <input
              type="number"
              placeholder="Horas Trabajadas"
              name="horas_trabajadas"
              onChange={handleChange}
              required
            />
          </InputWrap>
        </Col>
      </Row>
      <ButtonWrap align={'end'}>
        <Button type="submit">
          Guardar
          {loading && <CustomSpinner status="Primary" size="Small" />}
        </Button>
      </ButtonWrap>
    </form>
  );
};
export default HorasExtrasForm;
