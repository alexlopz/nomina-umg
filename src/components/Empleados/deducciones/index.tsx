import { Button, Col, Row, Select } from '@paljs/ui';
import CustomSpinner from 'components/CustomSpinner';
import { IPlainObject } from 'definitions/IPlainObjects';
import { useEffect, useState } from 'react';
import { ButtonWrap, SelectWrap } from './style';
import { IEmpleado } from 'definitions/IEmpleado';

const DeduccionesEmpleadoForm: React.FC<IPlainObject> = ({
  handleSubmit,
  empleados,
  catalogoDeducciones,
  handleSelectChange,
  handleSelectChangeDeducciones,
  loading,
}) => {
  const [dataEmpleados, setDataEmpleados] = useState<any[]>([]);
  const [dataDeducciones, setDataDeducciones] = useState<any[]>([]);

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

  const generarDatosCatalogoDeducciones = () => {
    const valores: any = [];
    catalogoDeducciones.map((deduccion: any) => {
      const value = {
        label: deduccion.nombre,
        value: deduccion.id,
        porcentaje: deduccion.porcentaje,
      };
      valores.push(value);
      setDataDeducciones(valores);
    });
  };

  useEffect(() => {
    generarDatosEmpleados();
  }, [empleados]);

  useEffect(() => {
    generarDatosCatalogoDeducciones();
  }, [catalogoDeducciones]);

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
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
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Deduccion:</label>
          <SelectWrap>
            <Select
              options={dataDeducciones}
              placeholder="Deducion"
              name="deduccion"
              onChange={handleSelectChangeDeducciones}
              required
            />
          </SelectWrap>
        </Col>
      </Row>
      <ButtonWrap align={'end'}>
        <Button type="submit" value="save" status={'Primary'} style={{ position: 'relative' }}>
          Guardar
          {loading && <CustomSpinner status="Primary" size="Small" />}
        </Button>
      </ButtonWrap>
    </form>
  );
};
export default DeduccionesEmpleadoForm;
