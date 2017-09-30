import React, { Component } from 'react';
import { connect } from "react-redux"
import "./FeedCard.css";
import ImageGrid from './ImageGrid';
import * as MapActions from '../actions/mapActions';
import { Item, List } from 'semantic-ui-react';
import * as moment from 'moment';

class FeedCard extends Component {
  voted() {
    return this.props.events.filter(event => event.id === this.props.id)[0].voted;
  }

  onUpvote = () => {
    if (this.voted()) return;
    this.props.dispatch(MapActions.upvote(this.props.id));
  };

  onDownvote = () => {
    if (this.voted()) return;
    this.props.dispatch(MapActions.downvote(this.props.id));
  };

  getCommentText() {
    const count = this.props.comments.length;
    if (count === 1) {
      return `${count} comment`;
    } else {
      return `${count} comments`;
    }
  }

  render() {
    return (
      <Item className="FeedCard">
        <Item.Content>
          <Item.Header className="FeedCard-header">
            {this.props.title}
          </Item.Header>

          <Item.Meta className="FeedCard-meta">
            <List className="FeedCard-info" divided horizontal>
                <List.Item icon='clock' content={moment(this.props.timestamp).fromNow()} />
                <List.Item icon='map outline' content={this.props.address.split(',')[0]} />
            </List>
          </Item.Meta>

          <Item.Description>
            {this.props.description}
          </Item.Description>
        </Item.Content>

        <Item.Extra>
          <ImageGrid images={this.props.images} />
          <List className="FeedCard-bar" divided horizontal>
            <List.Item icon='comment' content={this.getCommentText()} />
            <List.Item icon='arrow up' content={this.props.upvotes.toString()} onClick={this.onUpvote} />
            <List.Item icon='arrow down' content={this.props.downvotes.toString()} onClick={this.onDownvote} />
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
