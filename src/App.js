import React, {Component} from 'react';
import './App.css';
import MovieList from './components/movie-list'
import MovieDetails from './components/movie-details'
import MovieForm from './components/movie-form'

class App extends Component {

  state = {
    movies:[],
    selectedMovie: null,
    editedMovie: null,
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
    this.setState({selectedMovie: movie, editedMovie: null});
  }

  movieDeleted = selMovie => {
    const movies = this.state.movies.filter(movie => movie.id !== selMovie.id)
    // console.log(movie);
    this.setState({movies: movies, selectedMovie: null});
  }

  editClicked = selMovie => {
    this.setState({editedMovie: selMovie});

  }

  newMovie = () => {
    this.setState({editedMovie: {title: '', description:''}});

  }

  cancelForm = () => {
    this.setState({editedMovie: null});

  }

  addMovie= movie => {
    this.setState({movies: [...this.state.movies, movie]});

  }

  editedMovie= movie => {
    this.setState({movies: [...this.state.movies, movie]});

  }

  render(){
    return (
      <div className="App">
          <h1>Movie Rater</h1>
          <div className="layout">
            <MovieList movies={this.state.movies} movieClicked={this.loadMovie} 
              movieDeleted={this.movieDeleted}  editClicked={this.editClicked}
              newMovie={this.newMovie}/>
            <div>
              { !this.state.editedMovie ? 
                <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie}/>
              : <MovieForm movie={this.state.editedMovie} cancelForm={this.cancelForm}
              newMovie={this.addMovie} editedMovie={this.loadMovie}/>}
       
            </div>
          </div>
      </div>
    );
  }

}

export default App;
