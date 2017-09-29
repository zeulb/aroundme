import React, { Component } from 'react';
import "./Feeds.css";
import { Item } from 'semantic-ui-react';
import FeedCard from './FeedCard';

class Feeds extends Component {
  getEvents() {
    return this.props.events.sort((x, y) => y.timestamp - x.timestamp);
  }

  render() {
    return (
      <Item.Group className="Feeds" relaxed>
        {this.getEvents().map(event => <FeedCard {...event} />)}
        <Item style={{display: "none"}}/>
      </Item.Group>
    );
  }
}

export default Feeds;
