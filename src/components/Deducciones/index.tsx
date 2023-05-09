import { Button, Col, Row } from '@paljs/ui';
import { IPlainObject } from 'definitions/IPlainObjects';
import { ButtonWrap, InputWrap } from './style';

const DeduccionesForm: React.FC<IPlainObject> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Nombre" />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Descripcion" />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <InputWrap fullWidth size="Medium">
            <input type="number" placeholder="Porcentaje" />
          </InputWrap>
        </Col>
      </Row>
      <ButtonWrap align={'end'}>
        <Button type="submit">Guardar</Button>
      </ButtonWrap>
    </form>
  );
};
export default DeduccionesForm;
