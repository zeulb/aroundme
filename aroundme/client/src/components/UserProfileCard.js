import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { connect } from "react-redux";
import * as AppActions from '../actions/appActions';
import * as Icons from 'material-ui/svg-icons';
import './UserProfileCard.css';

class UserProfileCard extends Component {
  state = {
    editMode: false,
    description: ''
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.editMode && !prevState.editMode) {
      this.refs.textField.focus();
    }
  }

  onEditDescription = (event) => {
    event.stopPropagation();
    if (!this.state.editMode) {
      this.setState({
        editMode: true,
        description: this.props.description
      });
    } else {
      this.props.dispatch(AppActions.editDescription(this.state.description));
      this.setState({
        editMode: false
      });
    }
  }

  onDiscard = () => {
    if (this.state.description) {
      this.props.dispatch(AppActions.editDescription(this.state.description));
    }
    this.setState({
      editMode: false
    });
  }

  onTextChange = (event) => {
    this.setState({
      description: event.target.value
    });
  }

  renderAvatar() {
    return (
      <img className="UserProfileCard-avatar" src={this.props.user.pictureUrl} alt={this.props.user.name} />
    );
  }

  renderDescription() {
    if (!this.state.editMode) {
      return (
        <div className="UserProfileCard-aboutMe">{this.props.user.description}</div>
      );
    } else {
      return (
        <TextField
          ref="textField"
          className={
            "UserProfileCard-textField" +
              ((/iPhone|iPad|iPod/i.test(navigator.userAgent))
                 ? " UserProfileCard-textField--iOS"
                 : "")
          }
          hintText="Describe yourself..."
          fullWidth={true}
          rowsMax={2}
          multiLine={true}
          onBlur={this.onDiscard}
          onChange={this.onTextChange}
        />
      ); 
    }
  }

  renderDetails() {
    return (
        <div className="UserProfileCard-text"> 
          <div className="UserProfileCard-nameBlock">
            <div className="UserProfileCard-name">{this.props.user.name}</div>
            {(this.props.ownProfile && !this.state.editMode) ?
            <IconButton className="UserProfileCard-edit" onClick={this.onEditDescription}>
              <Icons.ImageEdit />
            </IconButton> : null}
          </div>
          <div className="UserProfileCard-bottom">
            {this.renderDescription()}
            {this.renderEventCount()}
          </div>
        </div>
    );
  }

  renderEventCount() {
    return (
      <div className="UserProfileCard-event">
        <div className="UserProfileCard-eventCount">{this.props.numEvents}</div>
        <div className="UserProfileCard-eventText">{this.props.numEvents !== 1 ? "events" : "event"}</div>
      </div>
    )
  }

  render() {
    return (
      <div className="UserProfileCard">
        {this.renderAvatar()}
        {this.renderDetails()}
      </div>
    );
  }
}

export default connect()(UserProfileCard);
