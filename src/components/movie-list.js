import React from 'react';
var FontAwesome = require('react-fontawesome');

function MovieList(props){
    const movieClicked = movie => evt => {
        props.movieClicked(movie);
    }
    const removeClicked = movie =>{
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 50ba24d0e0b9cdb1071834a57b215fa7b7412da7'
            }
            }).then( resp => props.movieDeleted(movie))
            .catch( error => console.log(error))
    }

    return (
        <div>
            {
                props.movies.map( movie =>{
                    return (
                    <div key={movie.id} >
                        <h3 onClick={movieClicked(movie)}>
                            {movie.title}
                        </h3>
                        <FontAwesome name='edit'></FontAwesome>
                        <FontAwesome name='trash' onClick={() => removeClicked(movie)}></FontAwesome>
                    </div>
                )})
            }
        </div>
    )
}

export default MovieList;