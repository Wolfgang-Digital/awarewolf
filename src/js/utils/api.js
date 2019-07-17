class Api {
  constructor() {
    this.url = 'https://awarewolf-api.herokuapp.com';
  }

  makeRequest = async ({ endpoint, payload }) => {
    try {
      const res = await fetch(`${this.url}${endpoint}`, payload);
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  fetchUsers = token => {
    return this.makeRequest({
      endpoint: '/api/users',
      payload: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token
        }
      }
    });
  };

  login = data => {
    return this.makeRequest({
      endpoint: '/auth/login',
      payload: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    });
  };

  signup = data => {
    return this.makeRequest({
      endpoint: '/auth/signup',
      payload: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    });
  };

  fetchPosts = token => {
    return this.makeRequest({
      endpoint: '/api/posts',
      payload: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token
        }
      }
    });
  };

  fetchPost = (post_id, token) => {
    return this.makeRequest({
      endpoint: `/api/posts/${post_id}`,
      payload: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token
        }
      }
    });
  };

  fetchPostComments = (post_id, token) => {
    return this.makeRequest({
      endpoint: `/api/comments/${post_id}`,
      payload: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token
        }
      }
    });
  };

  createPost = (token, data) => {
    return this.makeRequest({
      endpoint: '/api/posts/',
      payload: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify(data)
      }
    });
  };

  submitVote = (token, data) => {
    const endpoint = data.isPost ? `/api/posts/${data.id}/vote` : `/api/comments/${data.id}/vote`;
    return this.makeRequest({
      endpoint,
      payload: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify(data)
      }
    });
  };

  createComment = (token, data) => {
    return this.makeRequest({
      endpoint: '/api/comments',
      payload: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify(data)
      }
    });
  };

  resolvePost = (id, token) => {
    return this.makeRequest({
      endpoint: `/api/posts/${id}/resolve`,
      payload: {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token
        }
      }
    });
  };

  pinPost = (id, token) => {
    return this.makeRequest({
      endpoint: `/api/posts/${id}/pin`,
      payload: {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token
        }
      }
    });
  };

  uploadAvatar = (file, token) => {
    let data = new FormData();
    data.append('avatar', file);

    return this.makeRequest({
      endpoint: `/user/upload`,
      payload: {
        method: 'POST',
        headers: {
          token
        },
        body: data
      }
    });
  };

  removeAvatar = token => {
    return this.makeRequest({
      endpoint: `/user/remove-avatar`,
      payload: {
        method: 'PUT',
        headers: {
          token
        }
      }
    });
  };

  submitSurvey = (data, token) => {
    return this.makeRequest({
      endpoint: `/api/surveys`,
      payload: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify(data)
      }
    });
  };

  submitSurveyResponse = (data, id, token) => {
    return this.makeRequest({
      endpoint: `/api/surveys/${id}/respond`,
      payload: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify(data)
      }
    });
  };

  fetchSurveys = token => {
    return this.makeRequest({
      endpoint: `/api/surveys`,
      payload: {
        method: 'GET',
        headers: {
          token
        }
      }
    });
  }

  fetchSurveyById = (id, token) => {
    return this.makeRequest({
      endpoint: `/api/surveys/${id}`,
      payload: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token
        }
      }
    });
  }
  
  getSurveyResponses = (id, token) => {
    return this.makeRequest({
      endpoint: `/api/surveys/${id}/responses`,
      payload: {
        method: 'GET',
        headers: {
          token
        }
      }
    });
  };
}

const api = new Api();
export default api;
