import React, { useEffect, useState } from "react";
import PersonList from "./components/PersonList";
import Personform from "./components/PersonForm";
import axios from "axios";
import phoneService from "./services/phonebook";
import "./index.css";
import Notification from "./components/Notification";

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
    axios.get("http://localhost:3001/api/people/all").then((response) => {
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
      const changedPerson = { ...person, phoneNumber: newNumber };
      const { id } = person;

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
      <p className="text-5xl text-center font-bold justify-self-start mb-12">
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
        <div className="flex bg-gray-100 border border-black flex-col h-auto max-h-[75%] w-96 gap-4 rounded-md">
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold text-gray-700 uppercase py-2 px-3">
              Search:
            </p>
            <input
              className="text-black outline-none border border-black rounded-sm px-3 py-2"
              type="text"
              onChange={handleFilter}
            ></input>
          </div>
          <div className="">
            <h2 className="text-lg font-medium text-black">Phone Numbers:</h2>
            <PersonList
              persons={persons}
              handleDelete={handleDelete}
              filteredData={filteredData}
              filter={filter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
