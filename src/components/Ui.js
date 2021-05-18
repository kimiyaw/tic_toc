import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Aud from './Aud';
import Box from "./Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import After from "./After";
import Refresh from '@material-ui/icons/Refresh';


class Ui extends Component {
    constructor(props) {
        super(props);
        this.winner = this.winner.bind(this);
        this.state = {
            board: <Box size={props.size} won={this.winner} key="1"/>,
            open: false,
            text: ''
        }
    }

    winner = text => {
        this.setState({
            open: true,
            text: text
        })
    };

    resetGame = () => {
        const value = Math.random().toString(36).substring(7);
        this.setState({
            board: <Box size={this.props.size} won={this.winner} key={value}/>
        })
    };


    handleClose = () => {
        this.setState({open: false});
        this.resetGame();
    };


    render() {
        return (
            <Aud>

                {this.state.board}
                <Grid container justify='center' spacing={24} className="Grid">
                    <Grid item>
                        <Button
                            onClick={this.resetGame}
                            variant="raised"
                            color="default">
                            <Refresh style={{color:'#6618e0' , text_align :'center'}}/>
                            دوباره
                        </Button>
                    </Grid>

                </Grid>
                <After
                    text={this.state.text}
                    open={this.state.open}
                    onClose={this.handleClose}/>
            </Aud>
        )
    }
}

Ui.propTypes = {
  size: PropTypes.number
};

export default Ui;