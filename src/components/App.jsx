import React, { useEffect, useState} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";

const URL = 'https://pixabay.com/api/'
const KEY = '29215937-41c81d045ba1667a8b0b25d17';

function App() {
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(null);
 
  

  useEffect(() => {
    if (query === '') {
      return;
    }
    
    setStatus('pending');
    const fetchImages = () => {
      return fetch(
        `${URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error('Something goes wrong. Please, try again.'));
        })
        .then(pictures => {
          if (!pictures.total) {
            toast.error('We could not find anything!');
          }
          return pictures;
        })

        .catch(error => setError(error) && setStatus('rejected'));
    };

    fetchImages().then(pictures => {
      const selectedProperties = pictures.hits.map(
        ({ id, largeImageURL, webformatURL }) => {
          return { id, largeImageURL, webformatURL };
        }
      );
      setPictures(prevState => [...prevState, ...selectedProperties]);
      setStatus('resolved');
      setTotalHits(pictures.total);
    });
  }, [page, query]);

  const loaderHandler = () => {
    setPage(prev => prev + 1);
  };

  const onSubmit = newQuery => {
    if(query !== newQuery) {
      setPictures([]);
      setQuery(newQuery)
      setPage(1)
    }  
  };

    return (
      <>
        <Searchbar onSubmit={onSubmit} />
        {pictures.length > 0 && <ImageGallery images={pictures} />}
        {totalHits > pictures.length && (<Button onClick={loaderHandler} />)}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && { error }}
        <ToastContainer autoClose={2000} />
      </>
    );
  
};

export default App;

