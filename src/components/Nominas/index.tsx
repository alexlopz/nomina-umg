import { Button, Col, Row, Select } from '@paljs/ui';
import CustomSpinner from 'components/CustomSpinner';
import { SelectWrap } from 'components/Empleados/horas/style';
import { IEmpleado } from 'definitions/IEmpleado';
import { IPlainObject } from 'definitions/IPlainObjects';
import { useEffect, useState } from 'react';
import { ButtonWrap, InputWrap } from './style';

const NominasForm: React.FC<IPlainObject> = ({
  empleados,
  handleSubmit,
  handleSelectChange,
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
        <Col breakPoint={{ xs: 12, sm: 12 }}>
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
      </Row>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Nombre" name="nombre" onChange={handleChange} required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Apellido" name="apellido" onChange={handleChange} required />
          </InputWrap>
        </Col>
      </Row>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="E-Mail" name="email" onChange={handleChange} required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Contraseña" name="contraseña" onChange={handleChange} required />
          </InputWrap>
        </Col>
      </Row>
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <ButtonWrap align={'end'}>
            <Button type="submit">Guardar{loading && <CustomSpinner status="Primary" size="Small" />}</Button>
          </ButtonWrap>
        </Col>
      </Row>
    </form>
  );
};
export default NominasForm;
