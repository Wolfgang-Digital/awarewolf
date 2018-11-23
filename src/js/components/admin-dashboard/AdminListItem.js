import React from 'react';
import { GridItem } from 'styled-grid-responsive';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { animation, formatDate, formatName } from '../../utils';
import ReactionSummary from './ReactionSummary';
import AdminListControls from './AdminListControls';

const Wrapper = styled.div`
  animation: ${animation.fadeIn} .3s ease-in-out;
  border-radius: 2px;
  margin-bottom: 5px;
  border: 1px solid ${p => p.background};
  box-shadow: 1px 1px rgba(0,0,0,.1);
  transition: all 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
  transform: translateY(0);
  display: flex;
  flex-direction: row;
  align-items: baseline;
  text-align: left;
  padding: 8px 17px 8px 15px;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    span {
      color: ${p => (p.even ? p.theme.secondaryHighlight : p.theme.primaryHighlight)};
    }
    .highlight-reaction {
      background: ${p => (p.even ? p.theme.secondaryHighlight : p.theme.primaryHighlight)};
    }
  }

  > span {
    transition: color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
    font-size: .9em;
    color: #acacac;
    width: 150px;
  }
`;

const Title = styled.div`
  color: ${p => p.colour};
  font-weight: 300;
  font-size: 1.2em;
  color: #676767;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0 20px;
  width: 150px;
`;

const PostListItem = ({
  onClick, even, theme,
  post: { _id, title, _author, createdAt, isPinned, isResolved, ...rest }
}) => {
  return (
    <GridItem col={3 / 4} media={{ phone: 1, tablet: 3 / 4 }}>
      <Wrapper
        even={even}
        theme={theme}
        onClick={e => e.stopPropagation() & onClick(e, _id)}
        background={even ? theme.secondary : theme.primary}
        colour={even ? theme.darkText : 'white'}
      >
        <span>{formatDate(createdAt)}</span>
        <Title>{title}</Title>
        <span>{formatName(_author.username)}</span>
        <ReactionSummary {...rest} />
        <AdminListControls
          id={_id}
          isPinned={isPinned}
          isResolved={isResolved}
          colour={even ? theme.secondary : theme.primary}
          highlightColour={even ? theme.secondaryHighlight : theme.primaryHighlight}
        />
      </Wrapper>
    </GridItem>
  );
};

PostListItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    _author: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isResolved: PropTypes.bool.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
  }).isRequired,
  even: PropTypes.bool.isRequired
};

export default withTheme(PostListItem);