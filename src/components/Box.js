import React, {Component} from 'react';
import Aud from './Aud';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import './Box.css';
import ButtonBase from "@material-ui/core/ButtonBase";
import Icon from '@material-ui/core/Icon';


class Box extends Component {

    state = {
        myTurn: true,
        movecount: 0
    };

    board =
        Array.from({length: this.props.size},
            () => Array.from({length: this.props.size},
                () => 0
            )
        );

    clickHandler = (event) => {
        var target = event.currentTarget;
        var parent = target.parentElement;
        var child = target.children[0];
        const [x, y] = target.dataset.coord.split(':');
        const className = parent.getAttribute("class");
        parent.setAttribute("class", className + " Clicked");
        const value = child.innerHTML;
        if (value === '') {
            if (this.state.myTurn) {
                child.innerHTML = 'circle';
                child.style = 'color : lightblue' ;
                this.setState({myTurn: false});
                this.board[x][y] = 'O'
            } else {
                child.innerHTML = ('star');
                child.style = 'color : pink' ;

                this.setState({myTurn: true});
                this.board[x][y] = 'X'
            }
        }
        this.setState((prevState) => ({
            movecount: prevState.movecount + 1
        }), function () {
            if (this.state.movecount >= (this.props.size * 2 - 1)) {
                this.checkWinner(x, y)
            }
        });
    };

    checkWinner = (x, y) => {
        const width = this.props.size;
        //Columns check
        let column = [];
        for (let i = 0; i < width; i++) {
            column.push(this.board[i][y]);
        }
        if (column.every((val, i, arr) => val === arr[0])) {
            this.announcement();
            return
        }

        //Rows check
        let row = this.board[x];
        if (row.every((val, i, arr) => val === arr[0])) {
            this.announcement();
            return
        }

        //Diagonal check
        let diagonal = [];
        if (x === y) {
            for (let i = 0; i < width; i++) {
                diagonal.push(this.board[i][i])
            }
            if (diagonal.every((val, i, arr) => val === arr[0])) {
                this.announcement();
                return
            }
        }
        //Anti diagonal check
        diagonal = [];
        if ((parseInt(x, 10) + parseInt(y, 10)) === (width - 1)) {
            for (let i = 0; i < width; i++) {
                diagonal.push(this.board[i][(width - 1) - i])
            }
            if (diagonal.every((val, i, arr) => val === arr[0])) {
                this.announcement();
                return
            }
        }
        //Check draw
        if (this.state.movecount === Math.pow(width, 2)) {
            this.props.won('مساوی');

        }
    };


    announcement = () => {
        if (!this.state.myTurn) {
            this.props.won('تو بردی');

        }
        else {
            this.props.won('باختی');

        }
    };



    render() {
        const boardgui = this.board.map((row, rowId) => {
            const columns = row.map((column, columnId) => (
                <Grid key={columnId} item>
                    <ButtonBase style={{color : 'pink'}}>
                        <Paper
                            onClick={this.clickHandler}
                            elevation={4}
                            data-coord={rowId + ':' + columnId}
                            className="Paper">
                            <Icon
                                style={{fontSize: 30}}>
                            </Icon>
                        </Paper>
                    </ButtonBase>
                </Grid>
            ));
            return <Grid
                style={{color : 'blue'}}
                key={rowId}
                className="Grid"
                container
                justify="center"
                spacing={16}>
                {columns}
            </Grid>
        });

        return (
            <Aud>
                {boardgui}
            </Aud>
        )
    }
}

Box.propTypes = {
    won: PropTypes.func,
    size: PropTypes.number
};

export default Box;