import React, { Component } from "react";
import axios from "axios";

export const LyricsContext = React.createContext();

const reducer = (state, action) => {
	console.log("State from Reducer", state);
	switch (action.type) {
		case "SEARCH_TRACKS":
			return {
				...state,
				trackList: action.payload,
				header: "Search Result",
			};
		default:
			return state;
	}
};

export class LyricsProvider extends Component {
	state = {
		trackList: [],
		header: "Top 10 Tracks",
		dispatch: (action) => this.setState((state) => reducer(state, action)),
	};

	componentDidMount() {
		axios
			.get(
				`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=efa939ea5f09960bbd275d8499d59825`
			)
			.then((res) => {
				this.setState({ trackList: res.data.message.body.track_list });
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<LyricsContext.Provider value={this.state}>
				{this.props.children}
			</LyricsContext.Provider>
		);
	}
}

export const LyricsConsumer = LyricsContext.Consumer;
