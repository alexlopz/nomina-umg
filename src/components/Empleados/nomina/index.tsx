import { Button, Col, Row, Select } from '@paljs/ui';
import CustomSpinner from 'components/CustomSpinner';
import { IPlainObject } from 'definitions/IPlainObjects';
import { useEffect, useState } from 'react';
import { ButtonWrap, SelectWrap } from './style';
import { IEmpleado } from 'definitions/IEmpleado';

const NominaEmpleadoForm: React.FC<IPlainObject> = ({ handleSubmit, empleados, handleSelectChange, loading }) => {
  const [dataEmpleados, setDataEmpleados] = useState<any[]>([]);

  const generarDatosEmpleados = () => {
    const valores: any = [];
    empleados.map((empleado: IEmpleado) => {
      const value = {
        label: `${empleado.nombres} ${empleado.apellidos}`,
        value: empleado.id,
        name: 'empleado',
      };
      valores.push(value);
      setDataEmpleados(valores);
    });
  };

  useEffect(() => {
    generarDatosEmpleados();
  }, [empleados]);

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 8 }}>
          <label>Empleado:</label>
          <SelectWrap>
            <Select
              options={dataEmpleados}
              placeholder="Empleado"
              name="empleado"
              onChange={handleSelectChange}
              required
            />
          </SelectWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <ButtonWrap align={'end'}>
            <Button type="submit" fullWidth status={'Primary'} style={{ position: 'relative' }}>
              Exportar boleta pdf
              {loading && <CustomSpinner status="Primary" size="Small" />}
            </Button>
          </ButtonWrap>
        </Col>
      </Row>
    </form>
  );
};
export default NominaEmpleadoForm;
