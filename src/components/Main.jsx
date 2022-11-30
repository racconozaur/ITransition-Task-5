import React, { useState } from 'react';
import { ExportToCsv } from "export-to-csv";

import rus from "../data/rus.json"
import uzb from "../data/uzb.json"
import eng from "../data/eng.json"
import Contact from './Contact';

const Main = (props) => {

    const [fullContacts, setFullContacts] = useState([]);
    const [country, setCountry] = useState(uzb)
    const [numberOfRecords, setNumberOfRecords] = useState(20)
    const [mistakes, setMistakes] = useState(0)

    let tempContacts = [];

    const changeCountry = (ctry) => {
        setCountry(ctry)
        console.log(ctry);
    }


    const generateFullName = (country) => {
        let randName = Math.floor(Math.random() * country.names.length);
        let randMidName = Math.floor(Math.random() * country.middleNames.length);
        let randLastName = Math.floor(Math.random() * country.lastNames.length);
        return [
          country.names[randName],
          country.middleNames[randMidName],
          country.lastNames[randLastName],
        ].join(" ");
      }


    const generateCity = (country) => {
        let randCity = Math.floor(Math.random() * country.cities.length);
        
        return( 
          country.cities[randCity]
        )
        
    
    }

    const generateStreet = (country) => {
        let randStreet = Math.floor(Math.random() * country.streets.length);
        return(
            country.streets[randStreet]
        )
    }

    function generatePhone(country) {
        let phone = "";
        let randCode = Math.floor(Math.random() * country.phoneCodes.length);
        phone += country.phoneCodes[randCode];
        
        return phone;
      }

    function generateContacts(country, num) {
        for (let i = 0; i < num; i++) {
          let temp = [];
          temp.push(Math.random() * 9999999999);
          temp.push(generateFullName(country));
          
          temp.push(generatePhone(country));
          temp.push(generateCity(country));
          temp.push(generateStreet(country))
          tempContacts.push(temp);
          setFullContacts(tempContacts);
        }
      }

    function exportToCSV(fullContacts) {
        
        let data = [
            {
                fullContacts: fullContacts
            },
        ];

        const options = {
            fieldSeparator: ",",
            quoteStrings: '"',
            decimalSeparator: ".",
            showLabels: true,
            showTitle: true,
            title: "Contact",
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };

        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(data);
    }

    return (
        <div className=' flex flex-col items-center my-4 '>
            <div className=' flex justify-center items-start flex-col w-5/12 border p-4 rounded-xl'>
                <h2 className=' text-white text-xl font-bold'>Generate Random Contact</h2>
                <h3 className=' text-yellow-100 text-lg font-bold my-4'>Select the country</h3>
                <div className=' w-full flex justify-start'>
                    <button
                        onClick={() => changeCountry(uzb)}
                        className={ country == uzb ? 'bg-green-200 px-6 py-1 mx-4 rounded-lg' : 'bg-yellow-100 px-6 py-1 mx-4 rounded-lg'}
                    >
                        uzb
                    </button>

                    <button
                        onClick={() => changeCountry(eng)}
                        className={ country == eng ? 'bg-red-200 px-6 py-1 mx-4 rounded-lg' : 'bg-yellow-100 px-6 py-1 mx-4 rounded-lg'}
                    >
                        eng
                    </button>

                    <button
                        onClick={() => changeCountry(rus)}
                        className={ country == rus ? 'bg-blue-200 px-6 py-1 mx-4 rounded-lg' : 'bg-yellow-100 px-6 py-1 mx-4 rounded-lg'}
                    >
                        rus
                    </button>
                    
                </div>

                <label htmlFor="numberOfRecords" className=" mt-6 text-lg text-white font-bold">Number Of Records</label>
                <input
                    type="number"
                    min="20"
                    max="100"
                    step="1"
                    value={numberOfRecords}
                    onChange={e => setNumberOfRecords(e.target.value)}
                    className=" w-full my-2 px-2 rounded-lg h-8 cursor-pointer bg-slate-300"
                    id="numberOfRecords"
                /> 

                <label htmlFor="customRange1" className=" mt-6 text-lg text-white font-bold">Variaty of mistakes</label>
                <input
                    type="range"
                    max="10"
                    step="1"
                    value={mistakes}
                    onChange={(e) => setMistakes(e.target.value)}
                    className=" w-full my-2 rounded-lg h-4 cursor-pointer bg-green-300"
                    id="customRange1"
                /> 

                <button
                    onClick={() => generateContacts(country, numberOfRecords)}
                    className='bg-yellow-100 px-6 py-1 mx-4 my-2 rounded-lg'
                >
                    Generate
                </button>
                <button
                    onClick={() => exportToCSV(fullContacts)}
                    className='bg-yellow-100 px-6 py-1 mx-4 rounded-lg'
                >
                    Export All to CSV
                </button>
                {console.log(mistakes)}

                

            </div>
            
            {fullContacts.map(e => 
                <Contact
                key={e[0]}
                name={e[1]}
                phone={e[2]}
                city={e[3]}
                street={e[4]}
                mistakes={mistakes}
                
            />
            )}
            
            
        </div>
    );
};

export default Main;