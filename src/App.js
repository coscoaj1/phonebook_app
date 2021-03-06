import React, { useEffect, useState } from "react";
import Personform from "./components/PersonForm";
import axios from "axios";
import phoneService from "./services/phonebook";
import "./index.css";
import Notification from "./components/Notification";
import ListContainer from "./components/ListContainer";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  const timeout = () => {
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };
  const hook = () => {
    axios.get("/api/people/all").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => hook(), []);

  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      phoneNumber: newNumber,
    };

    const alreadyExists = persons.some((person) => person.name === newName);
    console.log(alreadyExists);
    if (newName === "") {
      return;
    }

    if (alreadyExists) {
      const person = persons.find((p) => p.name === newName);
      console.log(`${person.name} already exists`);
      const changedPerson = { ...person, phoneNumber: newNumber };
      const { id } = person;
      console.log(changedPerson);

      if (newNumber.length < 8) {
        setNotificationMessage(
          `${newNumber} is too short, please provide a number with at least 8 digits`
        );
        timeout();
        return;
      }

      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {
        console.log(person.id);
        phoneService //
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            console.log(returnedPerson);
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );

            setNotificationMessage(`Updated number for ${person.name}`);
            timeout();
          })
          .catch((error) => {
            console.log(error);
            setNotificationMessage(
              `Information for ${person.name} has already been removed from server`
            );
            setPersons(persons.filter((p) => p.id !== id));
            timeout();
          });
      }

      setNewName("");
      setNewNumber("");
      return;
    }

    phoneService //
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));

        setNotificationMessage(`Added ${returnedPerson.name}`);
        timeout();
        setNewName("");
        setNewNumber("");
        hook();
      })
      .catch((err) => {
        console.log(err);
        setNotificationMessage(err);
        timeout();
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
    console.log(event.target.value);
    const newFilter = persons.filter((value) => {
      return value.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setFilteredData(newFilter);
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (confirmDelete) {
      const filteredPersons = persons.filter((p) => p.id !== id);
      phoneService.deleteName(id);
      setPersons(filteredPersons);

      setNotificationMessage(`Deleted ${person.name}`);
      timeout();
    }
  };

  return (
    <div className="container relative">
      <p className="text-6xl text-center font-bold justify-self-start mb-12">
        Phonebook App
      </p>
      <Notification message={notificationMessage} />
      <div className="flex justify-around">
        <Personform
          newName={newName}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
          handleNameChange={handleNameChange}
          addName={addName}
        />
        <ListContainer
          persons={persons}
          handleDelete={handleDelete}
          filteredData={filteredData}
          filter={filter}
          handleFilter={handleFilter}
        />
      </div>
    </div>
  );
};

export default App;
