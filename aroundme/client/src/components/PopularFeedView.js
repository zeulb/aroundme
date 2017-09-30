import React, { Component } from 'react';
import Feeds from './Feeds';
import "./PopularFeedView.css";

class PopularFeedView extends Component {
  getEvents() {
    return this.props.events.sort((x, y) => (y.upvotes - y.downvotes) - (x.upvotes - x.downvotes));
  }

  render() {
    return (
      <div id="FeedView" className="PopularFeedView">
        <Feeds autoExpand={true} displayCreator={true} events={this.getEvents()} />
      </div>
    );
  }
}

export default PopularFeedView;
