import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Track extends Component {
    render() {
        const { album_name, artist_name, track_name, track_id } = this.props.track;

        return (
            <div className="col-md-6 mb-3">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h4>{artist_name}</h4>
                        <p>
                            <i className="fas fa-compact-disc"></i> <strong>Album Name :</strong> { album_name } <br />
                            <i className="fas fa-music"></i> <strong>Track Name :</strong> { track_name }
                        </p>
                        <Link to={`tracks/lyrics/${track_id}`} className="btn btn-info">
                            View Lyric <i className="fas fa-chevron-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Track;