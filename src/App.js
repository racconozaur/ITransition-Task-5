import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';

function App() {

	let arr = [1, 2, 3, 4]

	

	return (
		<>
			<Header>Contact Generation</Header>
			<Main contacts={arr}/>
			{console.log(arr)}
		</>

	);
}

export default App;
