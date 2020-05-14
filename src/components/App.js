import React from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null
  };

  componentDidMount() {
    this.onTermSubmit('cars');
  }

  onTermSubmit = async (term) => {
    try {
      const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          q: term,
          part: "snippet",
          type: "video",
          maxResults: 5,
          key: "AIzaSyA7n7DsPcK3-iV5YYDFc0NC0wWAG4Sey4o"
        }
      });
      this.setState({
        videos: response.data.items,
        selectedVideo: response.data.items[0]
      });
    } catch(err) {
      console.log(err);
    }
  }

  onVideoSelect = (video) => {
    this.setState({
      selectedVideo: video
    });
  }

  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={ this.onTermSubmit } />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={ this.state.selectedVideo } />
            </div>
            <div className="five wide column">
              <VideoList
                onVideoSelect={ this.onVideoSelect }
                videos={ this.state.videos }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
