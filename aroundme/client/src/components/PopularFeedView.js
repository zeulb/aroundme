import React, { Component } from 'react';
import Feeds from './Feeds';
import "./PopularFeedView.css";

class PopularFeedView extends Component {
  getEvents() {
    return this.props.events.sort((x, y) => (y.upvotes - y.downvotes) - (x.upvotes - x.downvotes));
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
      <div id="FeedView" className="PopularFeedView" style={this.display()}>
        <Feeds autoExpand={true} displayCreator={true} events={this.getEvents()} />
      </div>
    );
  }
}

export default PopularFeedView;
