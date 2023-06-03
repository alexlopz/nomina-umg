import { Button, Col, Row, Select } from '@paljs/ui';
import CustomSpinner from 'components/CustomSpinner';
import { IPlainObject } from 'definitions/IPlainObjects';
import { useEffect, useState } from 'react';
import { ButtonWrap, InputWrap, SelectWrap } from './style';
import { IEmpleado } from 'definitions/IEmpleado';

const BonificacionesEmpleadoForm: React.FC<IPlainObject> = ({
  handleSubmit,
  empleados,
  catalogoBonificaciones,
  handleSelectChange,
  handleChange,
  handleSelectChangeBonificaciones,
  loading,
}) => {
  const [dataEmpleados, setDataEmpleados] = useState<any[]>([]);
  const [dataBonificaciones, setDataBonificaciones] = useState<any[]>([]);

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

  const generarDatosCatalogoBonificaciones = () => {
    const valores: any = [];
    catalogoBonificaciones.map((bonificacion: any) => {
      const value = {
        label: bonificacion.nombre,
        value: bonificacion.id,
      };
      valores.push(value);
      setDataBonificaciones(valores);
    });
  };

  useEffect(() => {
    generarDatosEmpleados();
  }, [empleados]);

  useEffect(() => {
    generarDatosCatalogoBonificaciones();
  }, [catalogoBonificaciones]);

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
          <label>Bonificacion:</label>
          <SelectWrap>
            <Select
              options={dataBonificaciones}
              placeholder="Bonificacion"
              name="bonificacion"
              onChange={handleSelectChangeBonificaciones}
              required
            />
          </SelectWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <label>Monto:</label>
          <InputWrap fullWidth size="Medium">
            <input type="number" name="monto" onChange={handleChange} placeholder="Monto" required />
          </InputWrap>
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
export default BonificacionesEmpleadoForm;
