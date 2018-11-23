import React from 'react';
import { GridItem } from 'styled-grid-responsive';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import UserBox from '../user-box';
import ReactionBox from '../reaction-box';

const Wrapper = styled.div`
  border-radius: 3px;
  border: 1px solid ${p => p.theme.secondary};
  margin-top: 20px;
  text-align: left;
  color: ${p => p.theme.darkText};
  box-shadow: 1px 2px rgba(0,0,0,.2);
`;

const Header = styled.div`
  background: ${p => p.theme.secondary};
  border-radius: 3px 3px 0 0;
  padding: 10px;

  > h2 {
    margin: 0;
  }
`;

const Content = styled.div`
  padding: 10px;
  word-break: break-all;

  a:link, a:visited {
    color: ${p => p.theme.secondaryHighlight};
    text-decoration: none;
  }

  img {
    max-width: 50%;
    margin: 0 auto;
  }
`;

const PostItem = ({
  post: { _id, title, text, _author, _votes, _comments, createdAt, isPinned, isResolved }
}) => (
    <GridItem col={3 / 4} media={{ phone: 1, tablet: 3 / 4 }}>
      <Wrapper>
        <Header><h2>{title}</h2></Header>
        <UserBox
          username={_author.username}
          timestamp={createdAt}
          secondary
          avatar={_author.avatar}
        />
        <Content dangerouslySetInnerHTML={{ __html: text }} />
        <ReactionBox
          comments={_comments}
          votes={_votes}
          id={_id}
          isPost={true}
          even={true}
          isResolved={isResolved}
          isPinned={isPinned}
        />
      </Wrapper>
    </GridItem>
  );

PostItem.propTypes = {
  post: PropTypes.shape({
    _author: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    _votes: PropTypes.arrayOf(
      PropTypes.shape({
        _user: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
      })
    )
  })
};

export default PostItem;