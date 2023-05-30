import { Button, Col, Row, Select } from '@paljs/ui';
import CustomSpinner from 'components/CustomSpinner';
import { SelectWrap } from 'components/Empleados/horas/style';
import { IEmpleado } from 'definitions/IEmpleado';
import { IPlainObject } from 'definitions/IPlainObjects';
import { useEffect, useState } from 'react';
import { ButtonWrap, InputWrap } from './style';

const TipoAusenciaForm: React.FC<IPlainObject> = ({
  empleados,
  handleSubmit,
  handleChange,
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
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <SelectWrap>
            <Select options={datos} placeholder="ID Empleado" name="empleado" onChange={handleSelectChange} required />
          </SelectWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Tipo de Ausencia" name="tipoAusencia" onChange={handleChange} required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Descripcion" name="descripcion" onChange={handleChange} required />
          </InputWrap>
        </Col>
      </Row>
      <ButtonWrap align={'end'}>
        <Button type="submit">Guardar{loading && <CustomSpinner status="Primary" size="Small" />}</Button>
      </ButtonWrap>
    </form>
  );
};
export default TipoAusenciaForm;
