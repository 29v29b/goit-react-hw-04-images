import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types'; 
import css from './Searchbar.module.css'

export default class Searchbar extends Component {
    state = {
        query: '',
    };

    handleInputChange = event => {
        this.setState({ query: event.target.value.toLowerCase() });
    };
    
    handleSubmit = event => {
        
        event.preventDefault();
    
        if (this.state.query.trim() === '') {
            toast.error('Please, enter your word.')
            return;
        }
    
        this.props.onSubmit(this.state.query);
    };

    render() {
        
        return(
            <header className={css.searchbar}>
            <form className={css.form }onSubmit={ this.handleSubmit } >
                <button type="submit" className={css.button}>&#128269;</button>
                <input 
                onInput={this.handleInputChange}
                className={css.input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value = {this.state.query}
                />
            </form>
            </header>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};