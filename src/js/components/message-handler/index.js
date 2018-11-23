import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animation } from '../../utils';
import { viewActions } from '../../actions';
import { ErrorOutline } from 'styled-icons/material';
import { CheckCircle } from 'styled-icons/fa-regular';

const Wrapper = styled.div`
  position: fixed;
  top: 60px;
  width: 100%;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  margin-bottom: 5px;
  background: #acacac;
  animation: ${animation.slideDown} .2s ease-out;
  animation-fill-mode: forwards;
  width: 340px;
  background: white;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid;
  padding: 4px 8px;
  text-align: center;
  box-shadow: 1px 1px rgba(0,0,0,.2);
  cursor: pointer;
  color: ${p => (
    p.type === 'error' ? 'palevioletred' :
    p.type === 'warning' ? 'orange' :
    p.type === 'success' ? '#7accc8' :
    '#AAAAAA'
  )};
  border-color: ${p => (
    p.type === 'error' ? 'palevioletred' :
    p.type === 'warning' ? 'orange' :
    p.type === 'success' ? '#7accc8' :
    '#AAAAAA'
  )};

  > svg {
    margin-right: auto;
    position: absolute;
  }
  > span {
    margin: 0 auto;
  }
`;

const mapStateToProps = state => {
  return { 
    messages: state.viewState.messages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dismissMessages: id => dispatch(viewActions.dismissMessages(id))
  }
};

const MessageHandler = ({ messages, dismissMessages }) => (
  <Wrapper>
    {
      messages.map((m,i) => (
        <Message 
          key={`msg-${i}`} 
          type={m && m.type ? m.type : 'error'}
          onClick={() => dismissMessages(m.id)}
        >
          { 
            m && m.type === 'error' ? 
              <ErrorOutline size='1.3em' color='palevioletred' /> :
              m && m.type === 'success' ? 
                <CheckCircle size='1.3em' color='#7accc8' /> : null
          }
          <span>{ (!m || !m.message) ? 'Unspecified error.' : m.message }</span>
        </Message>
      ))
    }
  </Wrapper>
);

MessageHandler.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired
    })
  ),
  dismissMessages: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageHandler);