import { Button, Col, Row, Select } from '@paljs/ui';
import CustomSpinner from 'components/CustomSpinner';
import { IBanco } from 'definitions/IBanco';
import { IPlainObject } from 'definitions/IPlainObjects';
import { useEffect, useState } from 'react';
import { ButtonWrap, InputWrap, SelectWrap } from './style';
import { cuentaTipos, estados, generos, jornadas, periodosPago } from 'utilities/dataUtil';

const EmpleadosForm: React.FC<IPlainObject> = ({
  handleSubmit,
  handleChange,
  departamentos,
  bancos,
  puestos,
  handleFechaChange,
  handleSelectDepartamento,
  handleSelectPuesto,
  handleSelectChange,
  formulario,
  loading,
  modoEdicion,
  resetForm,
}) => {
  const [dataBancos, setDataBancos] = useState<any[]>([]);
  const [dataDepartamentos, setDepartamentos] = useState<any[]>([]);
  const [dataPuestos, setPuestos] = useState<any[]>([]);

  const generarDatosDepartamentos = () => {
    const valores: any = [];
    departamentos.map((departamento: IPlainObject) => {
      const value = {
        label: departamento.nombre,
        value: departamento.id,
      };
      valores.push(value);
      setDepartamentos(valores);
    });
  };

  const generarDatosPuestos = () => {
    const valores: any = [];
    puestos.map((puesto: IPlainObject) => {
      const value = {
        label: puesto.nombre,
        value: puesto.id,
        name: 'puesto',
      };
      valores.push(value);
      setPuestos(valores);
    });
  };

  const generarDatosBancos = () => {
    const valores: any = [];
    bancos.map((banco: IBanco) => {
      const value = {
        label: banco.nombre,
        value: banco.nombre,
        name: 'banco',
      };
      valores.push(value);
      setDataBancos(valores);
    });
  };

  const parseFecha = (fecha: any) => {
    if (fecha === '') {
      return fecha;
    } else {
      return fecha?.toDate().toISOString().substr(0, 10);
    }
  };

  useEffect(() => {
    generarDatosBancos();
  }, [bancos]);

  useEffect(() => {
    generarDatosDepartamentos();
  }, [departamentos]);

  useEffect(() => {
    generarDatosPuestos();
  }, [puestos]);

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Nombres:</label>
          <InputWrap fullWidth size="Medium">
            <input
              type="text"
              name="nombres"
              value={formulario.nombres}
              onChange={handleChange}
              placeholder="Nombres"
              required
            />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Apellidos:</label>
          <InputWrap fullWidth size="Medium">
            <input
              type="text"
              name="apellidos"
              value={formulario.apellidos}
              onChange={handleChange}
              placeholder="Apellidos"
              required
            />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Dpi:</label>
          <InputWrap fullWidth size="Medium">
            <input
              type="number"
              name="dpi"
              value={formulario.dpi ?? ''}
              onChange={handleChange}
              placeholder="Numero de DPI"
              required
            />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Correo:</label>
          <InputWrap fullWidth size="Medium">
            <input
              type="email"
              name="correo"
              value={formulario.correo}
              onChange={handleChange}
              placeholder="Correo electronico"
              required
            />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <label>Numero de Nit:</label>
          <InputWrap fullWidth size="Medium">
            <input type="text" name="nit" value={formulario.nit} onChange={handleChange} placeholder="Nit" required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <label>Fecha de Nacimiento:</label>
          <InputWrap fullWidth size="Medium">
            <input
              type="date"
              name="nacimiento"
              value={parseFecha(formulario.nacimiento)}
              onChange={handleFechaChange}
              placeholder="Fecha Nacimiento"
              required
            />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <label>Genero:</label>
          <SelectWrap>
            <Select
              options={generos}
              value={{ label: formulario.genero, value: formulario.genero }}
              placeholder="Genero"
              name="genero"
              onChange={handleSelectChange}
              required
            />
          </SelectWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 8 }}>
          <InputWrap fullWidth size="Medium">
            <input
              type="address"
              name="direccion"
              value={formulario.direccion}
              onChange={handleChange}
              placeholder="Direccion"
              required
            />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <InputWrap fullWidth size="Medium">
            <input
              type="tel"
              name="telefono"
              value={formulario.telefono ?? ''}
              onChange={handleChange}
              placeholder="Telefono"
              required
            />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <label>Departamento:</label>
          <SelectWrap>
            <Select
              value={{ label: formulario.departamento, value: formulario.departamentoId }}
              options={dataDepartamentos}
              placeholder="Departamento"
              name="departamento"
              onChange={handleSelectDepartamento}
              required
            />
          </SelectWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <label>Puesto:</label>
          <SelectWrap>
            <Select
              options={dataPuestos}
              value={{ label: formulario.puesto, value: formulario.puestoId, name: 'puesto' }}
              placeholder="Puesto"
              name="puesto"
              onChange={handleSelectPuesto}
              required
            />
          </SelectWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <label>Jornada Laboral:</label>
          <SelectWrap>
            <Select
              options={jornadas}
              value={{ label: formulario.jornada, value: formulario.jornada }}
              placeholder="Jornada"
              name="jornada"
              onChange={handleSelectChange}
              required
            />
          </SelectWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <label>Sueldo:</label>
          <InputWrap fullWidth size="Medium">
            <input
              type="number"
              name="sueldo"
              value={formulario.sueldo ?? ''}
              onChange={handleChange}
              placeholder="Sueldo"
              required
            />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <label>Periodo de pago:</label>
          <SelectWrap>
            <Select
              options={periodosPago}
              value={{ label: formulario.periodo_pago, value: formulario.periodo_pago }}
              placeholder="Periodo de Pago"
              name="periodo_pago"
              onChange={handleSelectChange}
              required
            />
          </SelectWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <label>Fecha de ingreso:</label>
          <InputWrap fullWidth size="Medium">
            <input
              type="date"
              name="fecha_ingreso"
              value={parseFecha(formulario.fecha_ingreso)}
              onChange={handleFechaChange}
              placeholder="Fecha de Ingreso"
              required
            />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <label>Numero de cuenta:</label>
          <InputWrap fullWidth size="Medium">
            <input
              type="number"
              name="banco_cuenta"
              value={formulario.banco_cuenta ?? ''}
              onChange={handleChange}
              placeholder="Numero de cuenta"
              required
            />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <label>Tipo de Cuenta:</label>
          <SelectWrap>
            <Select
              options={cuentaTipos}
              value={{ label: formulario.tipo_cuenta, value: formulario.tipo_cuenta }}
              placeholder="Tipo de Cuenta"
              name="tipo_cuenta"
              onChange={handleSelectChange}
              required
            />
          </SelectWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <label>Banco:</label>
          <SelectWrap>
            <Select
              options={dataBancos}
              value={{ label: formulario.banco, value: formulario.banco }}
              placeholder="Banco"
              name="banco"
              onChange={handleSelectChange}
              required
            />
          </SelectWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <label>Estatus:</label>
          <SelectWrap>
            <Select
              options={estados}
              value={{ label: formulario.estado, value: formulario.estado }}
              placeholder="Estado"
              name="estado"
              onChange={handleSelectChange}
              required
            />
          </SelectWrap>
        </Col>
      </Row>
      <ButtonWrap align={'end'}>
        <Button
          type="submit"
          value="save"
          status={modoEdicion ? 'Warning' : 'Primary'}
          style={{ position: 'relative' }}
        >
          Guardar
          {loading && <CustomSpinner status="Primary" size="Small" />}
        </Button>
        {modoEdicion && (
          <Button
            type="button"
            status="Danger"
            onClick={resetForm}
            style={{ position: 'relative', marginLeft: '20px' }}
          >
            Cancelar
          </Button>
        )}
      </ButtonWrap>
    </form>
  );
};
export default EmpleadosForm;
