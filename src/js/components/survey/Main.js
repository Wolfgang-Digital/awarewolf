import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import UserBox from '../user-box';
import QuestionList from './QuestionList';

const Wrapper = styled.div`
  border-radius: 3px;
  border: 1px solid ${p => p.theme.secondary};
  color: ${p => p.theme.darkText};
  box-shadow: 1px 2px rgba(0,0,0,.2);
  text-align: left;
`;

const Header = styled.div`
  background: ${p => p.theme.secondary};
  border-radius: 3px 3px 0 0;
  padding: 10px;

  > h2 {
    margin: 0;
  }
`;

const Description = styled.div`
  padding: 10px;

  a:link, a:visited {
    color: ${p => p.theme.secondaryHighlight};
    text-decoration: none;
  }
`;

const Content = styled.div`
  padding: 0;
`;

const Main = ({ id, author, title, description, createdAt, questions }) => (
  <Wrapper>
    <Header><h2>{title}</h2></Header>
    <Content>
      <UserBox
        username={author.username}
        timestamp={createdAt}
        avatar={author.avatar}
        secondary={true}
      />
      <Description>{description}</Description>
      <QuestionList id={id} questions={questions} />
    </Content>
  </Wrapper>
);

Main.propTypes = {
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  createdAt: PropTypes.string.isRequired
};

export default withTheme(Main);