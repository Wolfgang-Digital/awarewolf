import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import { animation } from '../../utils';

const API_KEY = 'nbsl44qgrjc21it3e1rejet6jkbg35wa7o54a9wpue41d8kp';

const WINDOW_HEIGHT = .3;

const Wrapper = styled.div`
  animation: ${animation.fadeIn} .5s ease-in-out;
  height: ${p => p.height + 70}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextEditor = ({ content, handleEditorChange, height, loading, loader: Loader }) => (
  <Wrapper height={height}>
    { Loader && <Loader /> }
    {
      !loading && 
        <Editor
          apiKey={API_KEY}
          value={content}
          onEditorChange={handleEditorChange}
          init={{
            plugins: 'link image',
            toolbar: 'undo redo | bold italic | image link',
            resize: false,
            menubar: '',
            branding: false,
            height
          }}
        />
    }
  </Wrapper>
);

TextEditor.propTypes = {
  content: PropTypes.string,
  handleEditorChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  height: PropTypes.number
};

TextEditor.defaultProps = {
  height: window.innerHeight * WINDOW_HEIGHT
};

export default TextEditor;