import { useState } from "react";
import { useAuth } from "../contexts/authentication";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [avatars, setAvatars] = useState({});

  const { register } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);

    for (let avatarKey in avatars) {
      formData.append("avatar", avatars[avatarKey]);
    }

    /*  const data = {
      username,
      password,
      firstName,
      lastName,
    }; */

    register(formData);
  };

  function handleFileChange(event) {
    const uniqueId = Date.now();
    setAvatars({
      ...avatars,
      [uniqueId]: event.target.files[0],
    });
  }

  function handleRemoveImage(event, avatarsKey) {
    event.preventDefault();
    delete avatars[avatarsKey];
    setAvatars({ ...avatars });
  }

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register Form</h1>
        <div className="input-container">
          <label>
            Username
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username here"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Password
            <input
              id="password"
              name="password"
              type="text"
              placeholder="Enter password here"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            First Name
            <input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="Enter first name here"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              value={firstName}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Last Name
            <input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Enter last name here"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              value={lastName}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Avatar
            <input
              id="avatar"
              name="avatar"
              type="file"
              placeholder="Enter last name here"
              multiple
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="image-list-preview-container">
          {Object.keys(avatars).map((avatarsKey) => {
            const file = avatars[avatarsKey];
            return (
              <div key={avatarsKey} className="image-preview-contianer">
                <img
                  className="image-Preview"
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                />
                <button
                  className="image-remove-button"
                  onClick={(event) => {
                    handleRemoveImage(event, avatarsKey);
                  }}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
        <div className="form-actions">
          <button type="submit" onSubmit={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
