import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Spinner from '../spinner/';

const CharDetailsBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
        :hover{
            font-size:30px;
            opacity:0.6;
            font-weight:800;
        }
    }
`

const Field = ({item, field, label}) => {
    return (
        <>
            <ListGroupItem  className="d-flex justify-content-between">
                <span className="term">{label}</span>
                <span>{item[field]}</span>
            </ListGroupItem>
        </>
    )
}
export {Field};


function CharDetails ({detaitData, itemId, children}){
    const [item, updateList] = useState([]);

    useEffect(() => {
        detaitData(itemId)
            .then((item) => {
                updateList(item)
            })
    },[item])

    if (!item) {
        return <Spinner />;
        //<span className='select-error' style={{color: "white"}}> Please select a characters </span>
    }

    for (let  key in item) {

        if (item[key][0] === "" || item[key].length === 0) {
            item[key] = "No information"
        }
    }
    
    const {name} = item;
    return (
        <CharDetailsBlock className="rounded">
            <h4>{name}</h4>
            <ListGroup flush>
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ListGroup>
        </CharDetailsBlock>
    )
}

export default CharDetails;

