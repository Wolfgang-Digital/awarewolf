import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { CheckCircle, TimesCircle } from 'styled-icons/fa-regular';
import Tippy from '@tippy.js/react';

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
`;

const Responses = styled.div`
  border-radius: 16px;
  background: ${p => p.background};
  color: ${p => p.colour};
  font-size: .8em;
  font-weight: 300;
  padding: 5px 10px;
`;

const UserResponse = styled.div`
  margin-left: auto;
`;

const SummaryBox = ({ responses, userId, secondary, theme }) => {
  const userComplete = responses.filter(r => r === userId).length > 0;

  return (
    <Wrapper>
      <Responses
        colour={secondary ? theme.darkText : 'white'}
        background={secondary ? theme.secondary : theme.primary}
      >
        {`${responses.length} Responses`}
      </Responses>
      <UserResponse>
        {
          userComplete ?
          <Tippy content={'Completed'} arrow={true}>
            <CheckCircle size={'1.5em'} color={secondary ? theme.secondary : theme.primary} />
          </Tippy>
          :
          <Tippy content={'Not yet completed'} arrow={true}>
            <TimesCircle size={'1.5em'} color={'#acacac'} />
          </Tippy>
        }
      </UserResponse>
    </Wrapper>
  );
};

SummaryBox.propTypes = {
  responses: PropTypes.arrayOf(PropTypes.string),
  userId: PropTypes.string.isRequired,
  secondary: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired
};

export default withTheme(SummaryBox);