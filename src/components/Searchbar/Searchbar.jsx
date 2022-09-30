import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types'; 
import css from './Searchbar.module.css'

function Searchbar({onSubmit}) {
    const [query, setQuery] = useState('')

    const handleInputChange = event => {
        setQuery(event.target.value.toLowerCase());
    };
    
    const handleSubmit = event => {
        
        event.preventDefault();
    
        if (query.trim() === '') {
            toast.error('Please, enter your word.')
            return;
        }
        
        onSubmit(query);
        };

        return(
            <header className={css.searchbar}>
            <form className={css.form } onSubmit={handleSubmit} >
                <button type="submit" className={css.button}>&#128269;</button>
                <input 
                onInput={handleInputChange}
                className={css.input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value = {query}
                />
            </form>
            </header>
        )
    }

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;