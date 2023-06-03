import { Button, Col, Row, Select } from '@paljs/ui';
import CustomSpinner from 'components/CustomSpinner';
import { IBanco } from 'definitions/IBanco';
import { IEmpleado } from 'definitions/IEmpleado';
import { IPlainObject } from 'definitions/IPlainObjects';
import { useEffect, useState } from 'react';
import { ButtonWrap, InputWrap, SelectWrap } from './style';

const PrestamosForm: React.FC<IPlainObject> = ({
  handleSubmit,
  handleChange,
  bancos,
  empleados,
  handleSelectChangeEmpleado,
  handleSelectChangeBanco,
  loading,
}) => {
  const [dataEmpleados, setDataEmpleados] = useState<any[]>([]);
  const [dataBancos, setDataBancos] = useState<any[]>([]);

  const generarDatosEmpleados = () => {
    const valores: any = [];
    empleados.map((empleado: IEmpleado) => {
      const value = {
        label: `${empleado.nombres} ${empleado.apellidos}`,
        value: empleado.id,
      };
      valores.push(value);
      setDataEmpleados(valores);
    });
  };

  const generarDatosBancos = () => {
    const valores: any = [];
    bancos.map((banco: IBanco) => {
      const value = {
        label: banco.nombre,
        value: banco.id,
      };
      valores.push(value);
      setDataBancos(valores);
    });
  };

  useEffect(() => {
    generarDatosEmpleados();
  }, [empleados]);

  useEffect(() => {
    generarDatosBancos();
  }, [bancos]);

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 8 }}>
          <SelectWrap>
            <Select
              options={dataEmpleados}
              placeholder="Id Empleado"
              name="empleado"
              onChange={handleSelectChangeEmpleado}
              required
            />
          </SelectWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <SelectWrap>
            <Select options={dataBancos} placeholder="Banco" name="banco" onChange={handleSelectChangeBanco} required />
          </SelectWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <InputWrap fullWidth size="Medium">
            <input type="number" name="cuenta" onChange={handleChange} placeholder="Cuenta" required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <InputWrap fullWidth size="Medium">
            <input type="number" name="cuota" onChange={handleChange} placeholder="Cuotas" required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <InputWrap fullWidth size="Medium">
            <input type="number" name="monto" onChange={handleChange} placeholder="Monto" required />
          </InputWrap>
        </Col>
      </Row>
      <ButtonWrap align={'end'}>
        <Button type="submit" style={{ position: 'relative' }}>
          Guardar
          {loading && <CustomSpinner status="Primary" size="Small" />}
        </Button>
      </ButtonWrap>
    </form>
  );
};
export default PrestamosForm;
