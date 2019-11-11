import React, {Component} from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
import gotService from '../../services/gotService'

export default class ItemList extends Component {
    constructor(){
        super();
        this.updateChar();
    }

    gotService = new gotService();
    state = {
        char: {}
    }

    onCharLoaded = (char) => {
        this.setState({char})
    }

    updateChar() {
        this.gotService.getAllCharacters()
            .then(this.onCharLoaded);
            //.catch(this.onError);
    }


    render() {

        return (
            <ListGroup>
                <ListGroupItem>
                name
                </ListGroupItem>
                <ListGroupItem>
                    name
                </ListGroupItem>
                <ListGroupItem>
                    name
                </ListGroupItem>
            </ListGroup>
        );
    }
}