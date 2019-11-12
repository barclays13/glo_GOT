import React, {Component} from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
import gotService from '../../services/gotService'
import Spinner from '../spinner/';
export default class ItemList extends Component {

    gotService = new gotService();
    state = {
        charList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (charList) => {
                this.setState({
                    charList
                })
            });
    }

    renderItems(arr) {
        return arr.map((item, i) => {
            return (
                <ListGroupItem
                    key={i}
                    onClick={() => this.props.onCharSelected(41+ i)}
                    >
                    {item.name}
                </ListGroupItem>
            )
        })
    }


    render() {
        const {charList} = this.state;

        if (!charList) {
            return <Spinner/>
        }

        const items = this.renderItems(charList);

        return (
            <ListGroup>
                {items}
            </ListGroup>
        );
    }
}