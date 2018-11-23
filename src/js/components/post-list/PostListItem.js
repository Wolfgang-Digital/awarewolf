import React from 'react';
import { GridItem } from 'styled-grid-responsive';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { animation } from '../../utils';
import UserBox from '../user-box';
import ReactionBox from '../reaction-box';

const Wrapper = styled.div`
  cursor: pointer;
  animation: ${animation.fadeIn} .3s ease-in-out;
  height: 300px;
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
  }
`;

const Content = styled.div`
  height: 130px;
  padding: 15px 10px 0 10px;
  color: ${p => p.colour};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  word-break: break-all;

  a:link, a:visited {
    color: ${p => p.highlight};
    text-decoration: none;
  }
  
  > img {
    display: none;
  }

  > img:first-of-type {
    height: 100%;
    max-width: 40%;
    float: left;
    margin-right: 10px;
    display: block;
  }
`;

const PostListItem = ({ 
  onClick, even, theme,
  post: { _id, title, text, _author, _comments, _votes, createdAt, isResolved, isPinned } 
}) => {
  return (
    <GridItem col={1/3} media={{ phone: 1, tablet: 1/2 }}>
      <Wrapper 
        onClick={e => e.stopPropagation() & onClick(e, _id)}
        background={even ? theme.secondary : theme.primary}
        colour={even ? theme.darkText : 'white'}
      >
        <div><h2>{ title }</h2></div>
        <UserBox 
          username={_author.username}
          timestamp={createdAt}
          secondary={even}
          avatar={_author.avatar}
        />
        <Content 
          colour={theme.darkText}
          highlight={even ? theme.secondaryHighlight : theme.primaryHighlight}
          dangerouslySetInnerHTML={{ __html: text }} 
        />
        <ReactionBox
          comments={_comments}
          votes={_votes}
          even={even}
          id={_id}
          isPost={true}
          style={{ marginTop: 'auto' }}
          isResolved={isResolved}
          isPinned={isPinned}
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