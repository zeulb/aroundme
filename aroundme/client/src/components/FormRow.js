import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as Icons from 'material-ui/svg-icons';
import "./FormRow.css";

class FormRow extends Component {
  render() {
    return (
      <div className="FormRow">
        <FloatingActionButton mini={true} className="FormRow-uploadButton">
          <Icons.ImagePhotoCamera />
        </FloatingActionButton>
        <Paper className="FormRow-inputContainer">

          <TextField
            className={
              "FormRow-textField" + 
                ((/iPhone|iPad|iPod/i.test(navigator.userAgent))
                   ? " FormRow-textField--iOS"
                   : "")
            }
            hintText=" Add description..."
            multiLine={true}
            rows={1}
            rowsMax={3}
            fullWidth={true}
            underlineShow={false}
          /><br />
        </Paper>
        <FloatingActionButton mini={true} className="FormRow-sendButton">
          <Icons.ContentSend />
        </FloatingActionButton>
      </div>
    );
  }
}

export default FormRow;
