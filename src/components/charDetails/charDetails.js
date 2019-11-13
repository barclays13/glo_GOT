import React, {Component} from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
import gotService from '../../services/gotService';
import Spinner from '../spinner/';
const CharDetailsBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`
const SelectError = styled.div`
    color: #fff;
    text-align: center;
    font-size: 26px;
`

export default class CharDetails extends Component {

    gotService = new gotService();
    state = {
        char: null
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return ; 
        }

        this.gotService.getCharacters(charId)
            .then((char) => {
                this.setState({char});
            })
        //this.foo.bar = 0;
    }

    render() {

        const {char} = this.state;

        if (!char) {
            return <Spinner/>;
            //<span className='select-error' style={{color: "white"}}> Please select a characters </span>
        }

        for (let  key in char) {
            if (char[key] ==="") {
                char[key] = "No information"
            }
        }

        const {char: {name, gender, born, died, culture}} = this.state;

        return (
            <CharDetailsBlock className="rounded">
                <h4>{name}</h4>
                <ListGroup flush>
                    <ListGroupItem  className="d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </ListGroupItem>
                    <ListGroupItem  className="d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </ListGroupItem>
                    <ListGroupItem  className="d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </ListGroupItem>
                    <ListGroupItem  className="d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </ListGroupItem>
                </ListGroup>
            </CharDetailsBlock>
        );
    }
}

