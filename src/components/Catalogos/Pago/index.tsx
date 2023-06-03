import { Button, Col, Row, Select } from '@paljs/ui';
import { IPlainObject } from 'definitions/IPlainObjects';
import { ButtonWrap, InputWrap } from './style';

const PagoForm: React.FC<IPlainObject> = ({ handleSubmit, mn }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          {/* <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Moneda" />
            <Select options={mn} placeholder="Moneda" />
          </InputWrap> */}
          <Select options={mn} placeholder="Moneda" />
        </Col>
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
      </Row>
      <ButtonWrap align={'end'}>
        <Button type="submit">Guardar</Button>
      </ButtonWrap>
    </form>
  );
};
export default PagoForm;
