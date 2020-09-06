import React, { Component } from "react";
import { LyricsConsumer } from "../../Context";
import axios from "axios";

class Search extends Component {
	state = {
		trackTitle: "",
	};
	onSubmitForm = (dispatch, e) => {
		e.preventDefault();

		dispatch({
			type: "SEARCH_TRACKS",
			payload: [],
		});

		axios
			.get(
				`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_API_KEY}`
			)
			.then((res) => {
				dispatch({
					type: "SEARCH_TRACKS",
					payload: res.data.message.body.track_list,
				});
			})
			.catch((err) => console.log(err));
	};

	onDataEntry = (e) => {
		this.setState({ trackTitle: e.target.value });
	};

	render() {
		return (
			<LyricsConsumer>
				{(value) => {
					const { dispatch } = value;

					return (
						<div className='container text-center mt-5 mb-5'>
							<form
								className='form-group w-50 mx-auto'
								onSubmit={this.onSubmitForm.bind(this, dispatch)}>
								<h1>
									<i className='fas fa-search'></i> Search Lyrics here
								</h1>
								<input
									type='text'
									className='form-control my-3'
									placeholder='Type the song name here...'
									onChange={(e) => this.onDataEntry(e)}
								/>
								<button type='submit' className='btn btn-success btn-block'>
									Get Tracks
								</button>
							</form>
						</div>
					);
				}}
			</LyricsConsumer>
		);
	}
}

export default Search;
