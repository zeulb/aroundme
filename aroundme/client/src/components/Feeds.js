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

  renderCommentCard() {
    const events = this.getEvents();
    if (events.length === 1 && (this.props.selectedEvent || this.props.autoExpand)) {
      return <CommentCard id={events[0].id} comments={events[0].comments} />
    } else {
      return null;
    }
  }

  renderGuide() {
    if (this.getEvents().length === 0) {
      return <Item>Be the first to create an event.</Item>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <Item.Group id="Feeds" className="Feeds" relaxed>
        {this.renderGuide()}
        {this.getEvents().map(event => <FeedCard displayCreator={this.props.displayCreator} key={`FeedCard.${event.id}`} {...event} onCommentClick={this.expandComment.bind(this, event)}/>)}
        
        {this.renderCommentCard()}
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
