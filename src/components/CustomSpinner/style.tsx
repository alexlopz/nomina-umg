import styled from 'styled-components';

export const SpinnerWrapper = styled.div<{ padding: boolean }>`
  padding: ${(props) => (props.padding ? '30px' : '0')};
`;
