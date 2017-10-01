import React, { Component } from 'react';
import Feeds from './Feeds';
import "./MapFeedView.css";

class MapFeedView extends Component {
  getEvents() {
    return this.props.events.sort((x, y) => y.timestamp - x.timestamp);
  }

  display() {
    if (this.props.displayImages) {
      return {
        display: 'none'
      }
    } else {
      return {
        display: 'block'
      }
    }
  }
  
  render() {
    return (
      <div id="FeedView" style={this.display()} className="MapFeedView">
        <Feeds autoExpand={true} displayCreator={true} events={this.getEvents()} myFeed={false}/>
      </div>
    );
  }
}

export default MapFeedView;
