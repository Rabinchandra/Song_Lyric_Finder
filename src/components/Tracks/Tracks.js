import React, { Component } from 'react'
import Track from './Track';
import { LyricsConsumer } from '../../Context'
import Spinner from '../layouts/Spinner';

class Tracks extends Component {
    render() {
        return (
            <LyricsConsumer>
                { value => {
                    const { trackList, header } = value;
                    
                    if(!trackList || !trackList.length) {
                        return <Spinner />
                    } else {
                        return (
                            <div className="container">
                                <div className="p-4 h4 text-center">{ header }</div>
                                <div className="row justify-content-around">
                                    { trackList.map(item => <Track track={item.track} key={item.track.track_id}/>)}
                                </div>
                            </div>
                        )
                    }
                } }
            </LyricsConsumer>
        )
    }
}

export default Tracks;