import { Button, Col, Row, Select } from '@paljs/ui';
import CustomSpinner from 'components/CustomSpinner';
import { SelectWrap } from 'components/Empleados/horas/style';
import { IEmpleado } from 'definitions/IEmpleado';
import { IPlainObject } from 'definitions/IPlainObjects';
import { useEffect, useState } from 'react';
import { ButtonWrap, InputWrap } from './style';

const SalariosForm: React.FC<IPlainObject> = ({
  empleados,
  handleSubmit,
  handleSelectChange,
  handleFechaChange,
  handleChange,
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
          <label>Id Empleado:</label>
          <SelectWrap>
            <Select
              options={datos}
              placeholder="Id empleado"
              name="Id empleado"
              onChange={handleSelectChange}
              required
            />
          </SelectWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <InputWrap fullWidth size="Medium">
            <input type="date" placeholder="Fecha" name="fecha" onChange={handleFechaChange} required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Descripcion" name="descripcion" onChange={handleChange} required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Salario" name="salario" onChange={handleChange} required />
          </InputWrap>
        </Col>
      </Row>
      <ButtonWrap align={'end'}>
        <Button type="submit">Guardar{loading && <CustomSpinner status="Primary" size="Small" />}</Button>
      </ButtonWrap>
    </form>
  );
};
export default SalariosForm;
