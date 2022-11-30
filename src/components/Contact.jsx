import React from 'react';
import { ExportToCsv } from "export-to-csv";

const Contact = (props) => {

    function exportToCSV(name, city, phone, address) {
        let data = [
            {
            name: name,
            city: city,
            phone: phone,
            address: address,
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

    function char_gen(len) {
        let chrs = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
        let str = '';
        for (let i = 0; i < len; i++) {
            let pos = Math.floor(Math.random() * chrs.length);
            str += chrs.substring(pos,pos+1);
        }
        return str;
    }

    let name = props.name
    let city = props.city
    let street = `${props.street} ${Math.floor(Math.random()*100)}`
    let number = `${props.phone}${Math.floor(1000000 + Math.random() * (9999999 +1 - 1000000) )}`

    if(props.mistakes < 3 && props.mistakes > 0){
        
        name = name + char_gen(1)
        city = city.slice(0, 4)
        street = street + Math.floor(Math.random()*10)

    }
    else if(props.mistakes > 3 && props.mistakes < 6){
        name = name + char_gen(4)
        city = city.slice(2, 5)
        street = char_gen(6) + street
    }
    else if(props.mistakes > 6 && props.mistakes <= 10){
        name = name.slice(4, 9) + char_gen(3)
        city = city.slice(1,6) + char_gen(2)
        street = street + Math.floor(Math.random()*10)+char_gen(2)
        number= number.slice(0, number.length) + Math.floor(Math.random()*100)
    }


    
    

    return (
        <div className=' flex justify-center items-start flex-col w-5/12 border p-4 rounded-xl my-4'>
            <h2 className=' text-white font-bold'>Full Name: {name}</h2>
            <h3 className=' text-white font-medium'>City: {city}</h3>
            <h3 className=' text-white font-medium'>Street: {street}</h3>
            <h4 className=' text-white font-medium'>Phone number: {number}</h4>
            <button
                onClick={() => {
                    exportToCSV(
                        props.name,
                        props.city,
                        street,
                        number
                    )
                }}
                className='bg-blue-100 px-4 py-1 mx-4 my-2 rounded-lg'
            >
                Export to CSV
            </button>
        </div>
    );
};

export default Contact;