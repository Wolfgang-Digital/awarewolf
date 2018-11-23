import React from 'react';
import styled from 'styled-components';
import { ThumbDown, ThumbUp } from 'styled-icons/material';
import { Exclamation, CommentAlt } from 'styled-icons/fa-solid';
import { arrayUtils } from '../../utils';
import Tippy from '@tippy.js/react';

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

const Metric = styled.div`
  display: flex;
  align-items: center;
  width: 50px;
  margin-left: auto;

  > div {
    border-radius: 50%;
    padding: 4px;
    background: #acacac;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > span {
    color: #676767;
    font-size: .8em;
    margin-left: 4px;
  }
`;

const ReactionSummary = ({ _votes, _comments }) => {
  const votes = arrayUtils.countVotes(_votes);

  return (
    <Wrapper>
      <Tippy content={'Total Comments'} arrow={true}>
        <Metric>
          <div className='highlight-reaction'><CommentAlt size={'.8em'} color={'white'} /></div>
          <span>{ arrayUtils.countChildren(_comments) }</span>
        </Metric>
      </Tippy>
      <Tippy content={'Total Likes'} arrow={true}>
        <Metric>
          <div className='highlight-reaction'><ThumbUp size={'.8em'} color={'white'} /></div>
          <span>{ votes.up }</span>
        </Metric>
      </Tippy>
      <Tippy content={'Total Dislikes'} arrow={true}>
        <Metric>
          <div className='highlight-reaction'><ThumbDown size={'.8em'} color={'white'} /></div>
          <span>{ votes.down }</span>
        </Metric>
      </Tippy>
      <Tippy content={'Overall Score'} arrow={true}>
        <Metric>
          <div className='highlight-reaction'><Exclamation size={'.8em'} color={'white'} /></div>
          <span>{ votes.score }</span>
        </Metric>
      </Tippy>
    </Wrapper>
  );
};

export default ReactionSummary;