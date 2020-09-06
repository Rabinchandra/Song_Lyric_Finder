import React, { Component } from 'react'
import axios from 'axios'
import Moment from 'react-moment'
import Spinner from '../layouts/Spinner'

class Lyrics extends Component {
    state = {
        id: this.props.match.params.id,
        track: {},
        lyrics: {}
    }

    componentDidMount() {
        axios
            .get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.state.id}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(res => {
                this.setState({ lyrics: res.data.message.body.lyrics })

                axios
                    .get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.state.id}&apikey=${process.env.REACT_APP_API_KEY}`)
                    .then(res => {
                        this.setState({ track: res.data.message.body.track })
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    render() {
        const { lyrics_body } = this.state.lyrics;
        const { album_name, artist_name, album_id, primary_genres, updated_time } = this.state.track;
        
        return (
            <React.Fragment>
                { 
                    (Object.keys(this.state.track).length === 0 ||
                    Object.keys(this.state.lyrics).length === 0)?
                    <Spinner /> :
                    (<div className="container mt-5">
                        <button className="btn btn-primary mb-4" onClick={ () => this.props.history.goBack() }> Back</button>
                        <div className="card">
                            <div className="card-header h3">{ album_name }</div>
                            <div className="card-body">{ lyrics_body }</div>
                        </div>
                        <ul className="list-group mt-4">
                            <li className="list-group-item">
                                <strong>Album Id :</strong> { album_id }
                            </li>
                            <li className="list-group-item">
                                <strong>Artist name :</strong> { artist_name }
                            </li>
                            <li className="list-group-item">
                                <strong>Song Genre :</strong> { primary_genres !== undefined? primary_genres.music_genre_list[0].music_genre.music_genre_name : ''}
                            </li>
                            <li className="list-group-item">
                                <strong>Updated Time :</strong> <Moment format="DD/MM/YY">{updated_time}</Moment>
                            </li>
                        </ul>
                    </div>)
                }
            </React.Fragment>
        )
    }
}

export default Lyrics;
