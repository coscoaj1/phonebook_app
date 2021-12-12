import React from 'react';

const Person = ({ person, handleDelete }) => (
	<div className="text-black person">
		<span className="person--name">{person.name} </span>
		<span className="person--number">{person.phoneNumber}</span>
		<button
			className="text-black font-medium bg-gray-200 px-2 py-1 rounded-md ml-2"
			onClick={() => handleDelete(person.id)}
		>
			Delete
		</button>
	</div>
);

export default Person;
