import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {ListGroup, ListGroupItem } from 'reactstrap';
import gotService from '../../services/gotService';
import Spinner from '../spinner/';
import ErrorMessage from '../errorMessage';

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    cursor: pointer;
        h4{
            height: 40px;
            margin-bottom: 20px;
            text-align: center;
        }
`

const TermSpan = styled.span`
    font-weight: bold;
`


function RandomChar(){

    const [{char, loading, error}, updataChar] = useState([]);
    useEffect (() => {
            updateChar();
            const timerId = setInterval(updateChar, 2000);
            return () => {
                clearInterval(timerId);
            }
        
    }, []);


    function onCharLoaded (char) {
        updataChar({
            char,
            loading: false
        })
    }

    function onError (error) {
        updataChar({
            error: true,
            loading: false
        })
    }

    function updateChar () {
        const id = Math.floor(Math.random()*140 + 25);
        gotService = new gotService();
        gotService.getCharacters(id)
            .then(onCharLoaded)
            .catch(onError);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char} /> : null ;

    function View(char) {

        for (let  key in char) {
            if (char[key] ==="") {
                char[key] = "No information"
            }
        }
    
        const{name, gender, born, died, culture} = char;
        return (
            <>
                <h4>Random Character: {name}</h4>
                <ListGroup>
                    <ListGroupItem className="d-flex justify-content-between">
                        <TermSpan>Gender </TermSpan>
                        <span>{gender}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <TermSpan>Born </TermSpan>
                        <span>{born}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <TermSpan>Died </TermSpan>
                        <span>{died}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <TermSpan>Culture </TermSpan>
                        <span>{culture}</span>
                    </ListGroupItem>
                </ListGroup>
            </>
        )
    }

    return (
        <RandomBlock className="rounded">
            {errorMessage}
            {spinner}
            {content}
        </RandomBlock>
    );

}

export default RandomChar;