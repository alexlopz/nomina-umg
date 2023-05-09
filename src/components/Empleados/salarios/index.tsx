import { Button, Col, Row } from '@paljs/ui';
import { IPlainObject } from 'definitions/IPlainObjects';
import { ButtonWrap, InputWrap } from './style';

const SalariosForm: React.FC<IPlainObject> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 3 }}>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Id_empleado" />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 3 }}>
          <InputWrap fullWidth size="Medium">
            <input type="date" placeholder="Fecha" />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 3 }}>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Descripcion" />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 3 }}>
          <InputWrap fullWidth size="Medium">
            <input type="number" placeholder="Salario" />
          </InputWrap>
        </Col>
      </Row>
      <ButtonWrap align={'end'}>
        <Button type="submit">Guardar</Button>
      </ButtonWrap>
    </form>
  );
};
export default SalariosForm;
