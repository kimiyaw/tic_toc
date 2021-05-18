import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import './After.css';

const afterdialog = (props) => {

    const { open, onClose, text } = props;



    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogContent className="Dialog">

                <DialogContentText className="Content">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color="primary"
                    autoFocus>
                        دوباره بازی میکنی؟
                    </Button>
            </DialogActions>
        </Dialog>
    )
};

afterdialog.propTypes = {
  open: PropTypes.func,
  onClose: PropTypes.func,
  text: PropTypes.string
};

export default withMobileDialog()(afterdialog);