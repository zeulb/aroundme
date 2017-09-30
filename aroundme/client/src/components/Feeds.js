import React, { Component } from 'react';
import "./Feeds.css";
import { Item } from 'semantic-ui-react';
import { connect } from "react-redux"
import FeedCard from './FeedCard';
import * as AppActions from '../actions/appActions';
import CommentCard from './CommentCard';

class Feeds extends Component {
  expandComment = (event) => {
    this.props.dispatch(AppActions.expandEvent(event.id));
  }

  getEvents() {
    if (this.props.selectedEvent) {
      return this.props.events.filter(event => event.id === this.props.selectedEvent);
    } else {
      return this.props.events;
    }
  }

  render() {
    return (
      <Item.Group className="Feeds" relaxed>
        {this.getEvents().map(event => <FeedCard {...event} onCommentClick={this.expandComment.bind(this, event)}/>)}
        {(this.props.selectedEvent !== null) ? <CommentCard comments={this.getEvents()[0].comments} /> : null}
        <Item style={{display: "none"}}/>
      </Item.Group>
    );
  }
}

export default connect(store => {
  return {
    selectedEvent: store.app.feedExpandedEvent
  };
})(Feeds);
