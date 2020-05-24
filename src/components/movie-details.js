import React, {Component} from 'react';
var FontAwesome = require('react-fontawesome');


class MovieDetails extends Component{

    state = {
        highlighted: -1
    }

    highlightRate = high => evt => {
        this.setState({highlighted: high})
    }

    rateClick = stars => evt => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 50ba24d0e0b9cdb1071834a57b215fa7b7412da7'
            },
            body: JSON.stringify({stars: stars + 1})
            }).then( resp => resp.json())
            .then( res => this.getDetails())
            .catch( error => console.log(error))
    }
    getDetails = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 50ba24d0e0b9cdb1071834a57b215fa7b7412da7'
            }
            }).then( resp => resp.json())
            .then( res => this.props.updateMovie(res))
            .catch( error => console.log(error))
    }

    render()  {
        const mov = this.props.movie;
        return (
            <React.Fragment>
                {mov ? (
                    <div>
                        <h3>{mov.title}</h3>
                        <FontAwesome name='star' className={mov.avg_rating > 0 ? 'orange': ''}></FontAwesome>
                        <FontAwesome name='star' className={mov.avg_rating > 1 ? 'orange': ''}></FontAwesome>
                        <FontAwesome name='star' className={mov.avg_rating > 2 ? 'orange': ''}></FontAwesome>
                        <FontAwesome name='star' className={mov.avg_rating > 3 ? 'orange': ''}></FontAwesome>
                        <FontAwesome name='star' className={mov.avg_rating > 4 ? 'orange': ''}></FontAwesome>
                        ({mov.no_of_ratings})
                        <p>{mov.description}</p>
                        <div className="rate-container">
                            <h2>Rate it !!!</h2>
                            {[...Array(5)].map((e,i) => {
                                return <FontAwesome name='star' key={i} className={this.state.highlighted > i - 1 ? 'purple': ''}
                                        onMouseEnter={this.highlightRate(i)} onMouseLeave={this.highlightRate(-1)} onClick={this.rateClick(i)}/>
                            })}
                        </div>
                    </div>
                ) : null}
            </React.Fragment>
        )
    }
}

export default MovieDetails;