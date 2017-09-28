import React, { Component } from 'react';
import "./FeedCard.css";
import { Item, List } from 'semantic-ui-react';
import * as moment from 'moment';

class FeedCard extends Component {
  getCommentText() {
    const count = this.props.comments.length;
    if (count === 1) {
      return `${count} comment`;
    } else {
      return `${count} comments`;
    }
  }

  render() {
    console.log(this.props.upvotes);
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
          <List className="FeedCard-bar" divided horizontal>
            <List.Item icon='comment' content={this.getCommentText()} />
            <List.Item icon='arrow up' content={this.props.upvotes.toString()} />
            <List.Item icon='arrow down' content={this.props.downvotes.toString()} />
          </List>
        </Item.Extra>
      </Item>
    );
  }
}

export default FeedCard;
