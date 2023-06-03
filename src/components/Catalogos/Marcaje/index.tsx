import { Button, Col, Row } from '@paljs/ui';
import { IPlainObject } from 'definitions/IPlainObjects';
import { ButtonWrap, InputWrap } from './style';

const MarcajeForm: React.FC<IPlainObject> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="ID Empleado" />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <InputWrap fullWidth size="Medium">
            <label htmlFor="fecha-hora-salida">Entrada</label>
            <input type="datetime-local" placeholder=" Fecha/Hora ENTRADA  " />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <InputWrap fullWidth size="Medium">
            <label htmlFor="fecha-hora-salida"> Salida</label>
            <input type="datetime-local" placeholder=" Fecha/Hora SALIDA  " />
          </InputWrap>
        </Col>
      </Row>
      <ButtonWrap align={'end'}>
        <Button type="submit">Guardar</Button>
      </ButtonWrap>
    </form>
  );
};
export default MarcajeForm;
