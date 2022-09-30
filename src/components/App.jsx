import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";


export default class App extends Component {
  state = {
    URL: 'https://pixabay.com/api/',
    KEY: '29215937-41c81d045ba1667a8b0b25d17',
    pictures: [],
    error: '',
    status: 'idle',
    page: 1,
    query: '',
    totalHits: null,
  };

  fetchImage = () => {
    return fetch(`${this.state.URL}?q=${this.state.query}&page=${this.state.page}&key=${this.state.KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Something goes wrong. Please, try again.'));
    })
    .then(pictures => {
      if (!pictures.total) {
        toast.error('We could not find anything!');
      }
      const imageProperties = pictures.hits.map(({ id, largeImageURL, webformatURL }) => {
          return { id, largeImageURL, webformatURL };
        }
      );

      this.setState(prevState => {
        return {
          pictures: [...prevState.pictures, ...imageProperties],
          status: 'resolved',
          totalHits: pictures.total,
          };
        });
      })

    .catch(error => this.setState({ error, status: 'rejected' }));
    };
  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      this.setState({ status: 'pending', pictures: [], page: 1 });
      this.fetchImage();
    }
    if (
      this.state.query === prevState.query &&
      this.state.page !== prevState.page
    ) {
      this.setState({ status: 'pending' });
      this.fetchImage();
    }
  }


  loaderHandler = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  onSubmit = query => {
    this.setState({ query });
  };


  render() {
    const { pictures, status, totalHits } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {pictures.length > 0 && <ImageGallery images={pictures} />}
        {totalHits > pictures.length && (
          <Button onClick={this.loaderHandler} />
        )}
        {status === 'pending' && <Loader />}
        <ToastContainer autoClose={2000} />
      </>
    );
  }
};


