import React, { useState } from 'react';

const FormComponent = () => {
  const [username, setUsername] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(username);
  };

  const setDefaultValue = () => {
    setUsername('JohnDoe');
  };

  return (
    <div>
      <button onClick={setDefaultValue}>Set Default Value</button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="Username"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
