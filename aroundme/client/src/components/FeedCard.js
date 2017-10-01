import React, { Component } from 'react';
import { connect } from "react-redux"
import "./FeedCard.css";
import ImageGrid from './ImageGrid';
import * as MapActions from '../actions/mapActions';
import * as AppActions from '../actions/appActions';
import { Item, List, Icon } from 'semantic-ui-react';
import * as moment from 'moment';

moment.updateLocale('en', {
  relativeTime : {
    s  : 'few secs',
    ss : '%d secs',
    m:  "1 min",
    mm: "%d mins",
    h:  "1 hour",
    hh: "%d hours",
    d:  "1 day",
    dd: "%d days",
    M:  "1 mth",
    MM: "%d mths",
    y:  "1 year",
    yy: "%d years"
  }
});

class FeedCard extends Component {
  currentEvent() {
    return this.props.events.filter(event => event.id === this.props.id)[0];
  }

  voted() {
    return this.currentEvent().voted;
  }

  userVote() {
    return this.currentEvent().userVote;
  }

  onUpvote = () => {
    if (this.voted()) {
      if (this.userVote() === 1) {
        this.props.dispatch(MapActions.unvote(this.props.id, true));
      }
    } else {
      this.props.dispatch(MapActions.upvote(this.props.id));
    }
  };

  onDownvote = () => {
    if (this.voted()) {
      if (this.userVote() === -1) {
        this.props.dispatch(MapActions.unvote(this.props.id, false));
      }
    } else {
      this.props.dispatch(MapActions.downvote(this.props.id));
    }
  };

  getCommentText() {
    const count = this.props.comments.length;
    if (count === 1) {
      return `${count} comment`;
    } else {
      return `${count} comments`;
    }
  }

  onViewUser = () => {
    this.props.dispatch(AppActions.switchPage(AppActions.Page.MY_FEED, { profileUser: this.props.creator }));
  }

  renderCreator() {
    return this.props.displayCreator
      ? (
        <img className="FeedCard-userPicture" src={this.props.creator.pictureUrl} alt="UserPicture" onClick={this.onViewUser} />
      )
      : null;
  }

  render() {
    return (
      <Item className="FeedCard">
        <Item.Content className="FeedCard-content">
          <div className="FeedCard-innerContent">
            <Item.Header className="FeedCard-header">
              {this.props.title}
            </Item.Header>

            <Item.Meta className="FeedCard-meta">
              {moment(this.props.timestamp).fromNow(true)}
              <Icon className="FeedCard-separator" name="point" />
              {this.props.address.split(',')[0]}
            </Item.Meta>
          </div>
          {this.renderCreator()}
        </Item.Content>

        <Item.Description>
          {this.props.description}
        </Item.Description>

        <Item.Extra>
          <ImageGrid images={this.props.images} />
          <List className="FeedCard-bar" divided horizontal>
            <List.Item icon='comment' content={this.getCommentText()} onClick={this.props.onCommentClick} />
            <List.Item className={this.userVote() === 1 ? "FeedCard--upvoted" : ""} icon='arrow up' content={this.props.upvotes.toString()} onClick={this.onUpvote} />
            <List.Item className={this.userVote() === -1 ? "FeedCard--downvoted" : ""} icon='arrow down' content={this.props.downvotes.toString()} onClick={this.onDownvote} />
          </List>
        </Item.Extra>
      </Item>
    );
  }
}

export default connect(store => {
  return {
    events: store.map.events
  };
})(FeedCard);
