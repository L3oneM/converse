import React, { useState, useEffect, useRef } from 'react';

const HomePage = ({ userCredentials }) => {
  console.log(1, userCredentials);

  useEffect(() => {
    // create a script tag
    const scriptTag = document.createElement('script');

    console.log(2, userCredentials);

    scriptTag.innerHTML = `setTimeout(
      () =>
        converse.initialize({
          bosh_service_url: 'https://conversejs.org/http-bind/', // Please use this connection manager only for testing purposes
        show_controlbox_by_default: true,
        auto_subscribe: true,
        play_sounds: true,
        message_limit: 1000,
        authentication: 'login',
        auto_login: true,
        jid: '${userCredentials.username}',
        password: '${userCredentials.password}',
        nickname: 'Leon'
        }),
      2000
    );`;

    console.log(scriptTag);

    document.body.appendChild(scriptTag);
  }, [userCredentials]);

  return <div>Helloo!!!</div>;
};

const App = () => {
  const [userCredentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  let [page, setPage] = useState('login');

  // create a ref with null as initial value
  const instance = useRef(null);

  // this runs after our component has rendered

  const hanldeSubmit = event => {
    event.preventDefault();

    setPage('home');
  };

  const handleChange = event => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div>
      {page === 'home' ? (
        <HomePage userCredentials={userCredentials} />
      ) : (
        <form id='form'>
          <label>username</label>
          <input
            type='text'
            name='username'
            onChange={handleChange}
            id='username'
            value={userCredentials.username}
          />
          <label>password</label>
          <input
            type='password'
            name='password'
            onChange={handleChange}
            id='password'
            value={userCredentials.password}
          />
          <div id='submit' onClick={hanldeSubmit}>
            Submit
          </div>
        </form>
      )}
      <div ref={instance} />
    </div>
  );
};

export default App;
