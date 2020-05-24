import React, {Component} from 'react';
import './App.css';
import MovieList from './components/movie-list'
import MovieDetails from './components/movie-details'

class App extends Component {

  state = {
    movies:[],
    selectedMovie: null,
  }

  componentDidMount(){
    fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token 50ba24d0e0b9cdb1071834a57b215fa7b7412da7'
      }
    }).then( resp => resp.json())
    .then( res => this.setState({movies: res}))
    .catch( error => console.log(error))
  }

  loadMovie = movie => {
    // console.log(movie);
    this.setState({selectedMovie: movie});
  }

  movieDeleted = selMovie => {
    const movies = this.state.movies.filter(movie => movie.id !== selMovie.id)
    // console.log(movie);
    this.setState({movies: movies, selectedMovie: null});
  }

  render(){
    return (
      <div className="App">
          <h1>Movie Rater</h1>
          <div className="layout">
            <MovieList movies={this.state.movies} movieClicked={this.loadMovie} movieDeleted={this.movieDeleted} />
            <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie}/>
          </div>
      </div>
    );
  }

}

export default App;
