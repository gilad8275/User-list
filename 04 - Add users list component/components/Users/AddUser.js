import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredUsername, setenteredUsername] = useState(""); //array destructuring
  const [enteredAge, setenteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input!",
        massage: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }

    if (+enteredAge < 1) {
      // + mean enteredAge convert from string to int
      setError({
        title: "Invalid input!",
        massage: "Please enter a valid age (Greater then 0).",
      });
      return;
    }

    props.onAddUser(enteredUsername, enteredAge);
    setenteredUsername(""); // Changes the field to an empty field but in the output and not in what we see
    setenteredAge(""); // Changes the field to an empty field but in the output and not in what we see
  };

  const usernameChangeHandler = (event) => {
    setenteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setenteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          massage={error.massage}
          onErrorHandler={errorHandler}
        ></ErrorModal>
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type={"text"}
            value={enteredUsername} // Restart the text box to empty
            onChange={usernameChangeHandler}
          ></input>

          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type={"number"}
            value={enteredAge} // Restart the text box to empty
            onChange={ageChangeHandler}
          ></input>

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
