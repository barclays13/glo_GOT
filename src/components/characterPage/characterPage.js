import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import './characterPage';
import ErrorMessage from '../errorMessage';

export default class CharacterPage extends Component{

    state = {
        selectedChar: 130,
        error: false
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    onCharSelected = (id) => {
        this.setState({
            selectChar: id
        })
    }

    render () {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return(
        <Row>
            <Col md='6'>
                <ItemList onCharSelected={this.onCharSelected}/>
            </Col>
            <Col md='6'>
                <CharDetails charId={this.state.selectedChar}/>
            </Col>
        </Row>
        )
    }
}