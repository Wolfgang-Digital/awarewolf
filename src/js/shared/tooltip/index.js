import styled from 'styled-components';
import { animation } from '../../utils';

const Tooltip = styled.span`
  font-size: .7em;
  letter-spacing: .02em;
  background: #676767;
  padding: 4px 6px;
  color: white;
  border-radius: 4px;
  animation: ${animation.fadeIn} .3s ease-out;
  outline: 0;
`;

export default Tooltip;