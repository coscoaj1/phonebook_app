import Person from "./Person";

const PersonList = ({ persons, handleDelete, filter, filteredData }) => (
  <div className="overflow-y-scroll h-80">
    {filter === ""
      ? persons?.map((person) => (
          <Person key={person.id} person={person} handleDelete={handleDelete} />
        ))
      : filteredData?.map((person) => (
          <Person key={person.id} person={person} handleDelete={handleDelete} />
        ))}
  </div>
);

export default PersonList;

// <ul>
// 	{persons.map(function (person) {
// 		return (
// 			<Person key={person.id} person={person} handleDelete={handleDelete} />
// 			// <li key={person.id}>
// 			// 	{person.name} {person.number}
// 			// </li>
// 		);
// 	})}
// </ul>
