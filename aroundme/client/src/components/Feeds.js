import React, { Component } from 'react';
import "./Feeds.css";
import { Item } from 'semantic-ui-react';
import FeedCard from './FeedCard';

class Feeds extends Component {
  render() {
    return (
      <Item.Group className="Feeds" relaxed>
        {this.props.events.map(event => <FeedCard {...event} />)}
        <Item style={{display: "none"}}/>
      </Item.Group>
    );
  }
}

export default Feeds;
