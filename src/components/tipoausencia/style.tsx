import { InputGroup } from '@paljs/ui';
import styled from 'styled-components';

const InputWrap = styled(InputGroup)`
  margin-bottom: 10px;
`;

const ButtonWrap = styled.div<{ align: string }>`
  display: flex;
  justify-content: ${(props) => props.align};
  padding-top: 20px;
`;

export { InputWrap, ButtonWrap };
