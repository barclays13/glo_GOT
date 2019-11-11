import React, {Component} from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
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
    constructor() {
        super();
        this.updateChar();
    }

    gotService = new gotService();
    state = {
        char: {},
        loading: true
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })
    }

    onError = (error) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar() {
        const id = Math.floor(Math.random()*140 + 25);
        this.gotService.getCharacters(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {

        const{char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null ;

        return (
            <CharDetailsBlock className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </CharDetailsBlock>
        );
    }
}

const View = ({char}) => {
    const{name, gender, born, died, culture} = char;
    return (
        <>
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
        </>
    )
}