import React from "react";

const Personform = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addName,
}) => {
  return (
    <>
      <div className="flex flex-col gap-4 items-center w-96 bg-gray-100 rounded-md shadow-violet-600 shadow-lg p-8 h-auto">
        <h2 className="text-2xl font-bold text-black">Add New Contact</h2>
        <form
          className="flex flex-col gap-4 justify-between w-72"
          onSubmit={addName}
        >
          <div className="flex flex-col mb-4">
            <label className="mb-2 uppercase font-bold text-lg text-gray-700">
              Name:
            </label>
            <input
              className="border rounded-sm border-black py-2 px-3 text-gray-700"
              type="text"
              value={newName}
              onChange={handleNameChange}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 uppercase font-bold text-lg text-gray-700">
              Number:{" "}
            </label>
            <input
              className="border rounded-sm border-black py-2 px-3 text-gray-700"
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>
          <div></div>
          <button
            className="block bg-teal-500 hover:bg-teal-800 text-white uppercase text-lg mx-auto p-4 rounded-md"
            type="submit"
          >
            Add Contact
          </button>
        </form>
      </div>
    </>
  );
};

export default Personform;
