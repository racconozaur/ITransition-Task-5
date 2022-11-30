import React from 'react';

const Header = (props) => {
    return (
        <header>
            <nav className=' h-12 bg-emerald-300 flex justify-center items-center'>
                <h1 className=' font-bold text-lg'>{props.children}</h1>
            </nav>
        </header>
    );
};

export default Header;