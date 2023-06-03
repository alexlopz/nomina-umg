import { Spinner } from '@paljs/ui';
import { IPlainObject } from 'definitions/IPlainObjects';
import { SpinnerWrapper } from './style';

const CustomSpinner: React.FC<IPlainObject> = ({ status, size, padding }) => {
  return (
    <SpinnerWrapper padding={padding}>
      <Spinner status={status} size={size} />
    </SpinnerWrapper>
  );
};
export default CustomSpinner;
