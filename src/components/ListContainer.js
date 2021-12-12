import React from "react";
import PersonList from "./PersonList";

export default function ListContainer({
  persons,
  handleDelete,
  filteredData,
  filter,
  handleFilter,
}) {
  return (
    <div className="flex bg-gray-100 flex-col h-auto max-h-[75%] w-96 gap-4 rounded-md shadow-violet-500 shadow-lg">
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
  );
}
