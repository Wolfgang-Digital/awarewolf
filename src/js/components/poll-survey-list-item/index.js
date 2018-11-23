import React from 'react';
import { GridItem } from 'styled-grid-responsive';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { animation } from '../../utils';
import UserBox from '../user-box';
import SummaryBox from './SummaryBox';
import { Question, ChartBar } from 'styled-icons/fa-solid';
import Tippy from '@tippy.js/react';

const Wrapper = styled.div`
  cursor: pointer;
  animation: ${animation.fadeIn} .3s ease-in-out;
  border-radius: 2px;
  margin-bottom: 20px;
  border: 1px solid ${p => p.background};
  box-shadow: 1px 2px rgba(0,0,0,.2);
  transition: all 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
  transform: translateY(0);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 1px 3px rgba(0,0,0,.2);
  }
  
  > div:first-of-type {
    height: 50px;
    background: ${p => p.background};
    display: flex;
    align-items: center;
    padding: 10px;
    
    > h2 {
      color: ${p => p.colour};
      font-weight: 300;
      font-size: 1.2em;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    svg {
      margin-left: auto;
      color: ${p => p.colour};
    }
  }
`;

const Content = styled.div`
  padding: 15px 10px 0 10px;
  color: #676767;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 35px;
`;

const PollSurveyListItem = ({ open, item, secondary, theme, userId }) => {
  const { _id, title, description, _author, createdAt, userResponses } = item;

  return (
    <GridItem col={1 / 3} media={{ phone: 1, tablet: 1 / 2 }}>
      <Wrapper
        onClick={e => e.stopPropagation() & open(e, _id)}
        background={secondary ? theme.secondary : theme.primary}
        colour={secondary ? theme.darkText : 'white'}
      >
        <div>
          <h2>{title}</h2>
          {
            !item.questions ?
              <Tippy content={'Poll'} arrow={true}>
                <ChartBar size={'1.2em'} color={'#676767'} />
              </Tippy>
              :
              <Tippy content={'Survey'} arrow={true}>
                <Question size={'1.2em'} color={'#676767'} />
              </Tippy>
          }
        </div>
        <UserBox
          username={_author.username}
          timestamp={createdAt}
          secondary={secondary}
          avatar={_author.avatar}
        />
        <Content>
          {description || 'No description.'}
        </Content>
        <SummaryBox
          responses={userResponses}
          userId={userId}
          secondary={secondary}
        />
      </Wrapper>
    </GridItem>
  );
};

PollSurveyListItem.propTypes = {
  item: PropTypes.shape({
    _author: PropTypes.shape({
      username: PropTypes.string.isRequired
    }).isRequired,
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    createdAt: PropTypes.string.isRequired
  }).isRequired
};

export default withTheme(PollSurveyListItem);