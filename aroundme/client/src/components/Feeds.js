import React, { Component } from 'react';
import "./Feeds.css";
import { Item } from 'semantic-ui-react';
import FeedCard from './FeedCard';
import CommentCard from './CommentCard';

class Feeds extends Component {
  render() {
    return (
      <Item.Group className="Feeds" relaxed>
        {this.props.events.map(event => <FeedCard {...event} />)}
        <CommentCard />
        <Item style={{display: "none"}}/>
      </Item.Group>
    );
  }
}

export default Feeds;
