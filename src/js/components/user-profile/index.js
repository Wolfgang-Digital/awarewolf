import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiActions } from '../../actions';
import PropTypes from 'prop-types';
import { Grid, GridItem } from 'styled-grid-responsive';
import Dropzone from 'react-dropzone';
import { Wrapper, dropzoneStyle, rejectStyle, acceptStyle } from './Styles';
import { formatName } from '../../utils';
import { Button } from '../../shared';
import { ErrorOutline, AddAPhoto } from 'styled-icons/material';

const mapStateToProps = state => {
  return {
    user: state.apiState.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadAvatar: (file, token) => dispatch(apiActions.uploadAvatar(file, token)),
    removeAvatar: token => dispatch(apiActions.removeAvater(token))
  }
};

class UserProfile extends Component {
  state = {
    file: '',
    error: false
  };

  handleDrop = files => {
    this.setState({ file: files[0], error: false });
  };

  handleError = () => this.setState({ error: true });

  componentWillUnmount() {
    window.URL.revokeObjectURL(this.state.file.preview);
  }

  uploadFile = () => {
    const { user, uploadAvatar } = this.props;
    uploadAvatar(this.state.file, user.token);
  };

  getImage = () => {
    const { file, error } = this.state;
    const { user } = this.props;

    if (error) return <ErrorOutline size='4em' color='palevioletred' />;

    if (file) {
      return (
        <img
          src={file.preview}
          onError={this.handleError}
          alt='preview'
        />
      );
    }
    if (user.avatar) {
      return (
        <img
          src={user.avatar}
          onError={this.handleError}
          alt='preview'
        />
      );
    }
    return <AddAPhoto size={'4em'} color='#acacac' />;
  };

  render() {
    const { file, error } = this.state;
    const { user, removeAvatar } = this.props;
    const Image = this.getImage();

    return (
      <Grid center>
        <GridItem col={3 / 4} media={{ phone: 1, tablet: 3 / 4 }}>
          <Wrapper>
            <h1>{`Welcome ${formatName(user.username)}`}</h1>
            <span>{ error && `Error locating profile image.` }</span>
            <Dropzone
              accept='image/jpg, image/jpeg'
              onDrop={this.handleDrop}
              style={
                error ? rejectStyle :
                !!file || user.avatar ? acceptStyle :
                dropzoneStyle
              }
              activeStyle={acceptStyle}
              rejectStyle={rejectStyle}
            >
              { Image }
            </Dropzone>
            <p>
              Drag and drop or click above to upload a profile image.
              <br /><br />
              <span>Allowed file types: .jpg, .jpeg</span>
            </p>
            <Button
              onClick={this.uploadFile}
              width={'120px'}
              enabled={!!file}
            >
              Upload
            </Button>
            {
              user.avatar &&
              <Button
                enabled={true}
                style={{
                  marginTop: '10px'
                }}
                width={'120px'}
                onClick={() => removeAvatar(user.token)}
              >
                Remove
              </Button>
            }
          </Wrapper>
        </GridItem>
      </Grid>
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    token: PropTypes.string
  }).isRequired,
  uploadAvatar: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);