import { browserHistory } from 'react-router';
import { SIGN_OUT_USER,
  AUTH_USER, AUTH_ERROR,
  FETCH_KEYS, OPEN_MODAL,
  CLOSE_MODAL,
  FETCH_URLS, UPDATE_GITHUB_STATUS,
  FETCH_REPOS, SET_MODAL_MODE,
  OPEN_EDIT_MODAL, CLOSE_EDIT_MODAL,
  SET_EDIT_MODAL_MODE, OPEN_APIKEY_MODAL,
  CLOSE_APIKEY_MODAL, SET_APIKEY_MODAL_MODE
} from '../utils/AppConstants';

export const authUser = (email) => ({
  type: AUTH_USER,
  email
});
export const authError = (error) => ({
  type: AUTH_ERROR,
  payload: error
});
export const authRemove = () => ({ type: SIGN_OUT_USER });

export const requestKeys = (keys) => ({
  type: FETCH_KEYS,
  payload: keys
});

const headers = new Headers();

headers.append('Content-Type', 'application/json');

export const signInUser = (credentials, endpoint) => (
  (dispatch) => {
    const url = `/api${endpoint}`;
    const data = {
      email: credentials.email,
      password: credentials.password
    };

    fetch(url, {
      method: 'POST',
      headers,
      credentials: 'same-origin',
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.error) {
        dispatch(authError(json.error));
      } else {
        // console.log(json,'signedin')
        localStorage.token = true;
        dispatch(authUser(credentials.email));
        browserHistory.push('/dashboard');
      }
    })
    .catch((error) => {
      console.log('fetch error:', error);
      dispatch(authError(error));
    });
  }
);


export const logOut = () => (
  (dispatch) => {
    fetch('/api/users/signout', { credentials: 'same-origin' })
    .then(() => {
      Reflect.deleteProperty(localStorage, 'token');

      dispatch(authRemove());
      browserHistory.replace('/');

    })
    .catch((error) => console.log('fetch error:', error));
  }
 );

export const getApiKeys = () => (
  (dispatch) => {
    fetch('/api/keys', { credentials: 'same-origin' })
    .then((response) => response.json())
    .then((json) => dispatch(requestKeys(json)))
    .catch((error) => dispatch(authError(error)));
  }
);

export const fetchUrls = () => ((dispatch) => {
  fetch('/api/urls', { credentials: 'same-origin' })
  .then((response) => response.json())
  .then((urls) => {
    dispatch({ type: FETCH_URLS, urls });
  })
  .catch((err) => {
    console.log(err);
  });
});

const fetchRepos = (dispatch) => (
  fetch('/api/github/repos', { credentials: 'same-origin' })
  .then((response) => response.json())
  .then((repos) => {
    if (repos.error) {
      dispatch({ type: FETCH_REPOS, repos: [] });
    } else {
      dispatch({ type: FETCH_REPOS, repos });
    }
  })
);

export const fetchGithubAuthStatus = () => ((dispatch) => {
  fetch('/api/users/hasgithub', { credentials: 'same-origin' })
  .then((response) => response.json())
  .then((res) => {
    console.log('github status:', res);
    dispatch({ type: UPDATE_GITHUB_STATUS, status: res.github });

    return fetchRepos(dispatch);
  })
  .catch((err) => {
    console.log(err);
  });
});

//*******Modal Related Actions*******//

// create new key Modal actions
export const showModal = () => ({ type: OPEN_MODAL });
export const hideModal = () => ({ type: CLOSE_MODAL });
export const setModalModeAddUrl = (mode) => ({
  type: SET_MODAL_MODE,
  modalModeAddUrl: mode
});

// edit existing key Modal actions
export const showEditModal = (key) => ({
  type: OPEN_EDIT_MODAL,
  key
});
export const hideEditModal = () => ({ type: CLOSE_EDIT_MODAL });
export const setEditModalNewUrl = (mode) => ({
  type: SET_EDIT_MODAL_MODE,
  mode
});

export const showApikeyModal = (key = null) => ({
  type: OPEN_APIKEY_MODAL,
  key,
  mode: key === null ? 'create' : 'edit'
});
export const hideApikeyModal = () => ({ type: CLOSE_APIKEY_MODAL });
export const setApikeyModalMode = (mode) => ({
  type: SET_APIKEY_MODAL_MODE,
  mode
});

// both modals
export const createNewUrl = (urlObject) => (
 fetch('/api/urls', {
   method: 'POST',
   headers,
   credentials: 'same-origin',
   body: JSON.stringify(urlObject)
 })
);
export const createNewKey = ({ key, name, type, endpoint }) => (
  (dispatch) => {
    const requestBody = {
      name,
      type,
      endpoint
    };

    if (key) {
      requestBody.key = key;
    }

    //make the API Key
    fetch('/api/keys', {
      method: 'POST',
      headers,
      credentials: 'same-origin',
      body: JSON.stringify(requestBody)
    })
    .then(() => {
      if (type === 'url') {
        return createNewUrl({ url: endpoint });
      }

      return null;
    })
    .then(() => {
      dispatch(getApiKeys());
      dispatch(fetchUrls());
      dispatch(fetchGithubAuthStatus());
      dispatch(setModalModeAddUrl(false));
      dispatch(hideModal());
      dispatch(hideEditModal());
      browserHistory.replace('/dashboard');
    })
    .catch((error) => {
      console.log('error in createnewkey:', error);
      dispatch(error);
    });
  }
);
