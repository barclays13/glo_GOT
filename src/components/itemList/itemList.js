import React, {useState, useEffect} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Spinner from '../spinner/';

function  ItemList({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);
    

    useEffect(() => {
        getData()
        .then( (data) => {
            updateList(data)
        });
    }, [])

    function rendersItems(arr) {
        return arr.map((item) => {
            const id = item.url.match(/\/([^\/]+)\/?$/)[1];
            const label = renderItem(item);
            return (
                <ListGroupItem
                    style ={{cursor: "pointer"}}
                    key={id}
                    onClick={() => onItemSelected(id)}>
                    {label}
                </ListGroupItem>
            )
        })
    }

    if (!itemList) {
        return <Spinner/>
    }

    const items = rendersItems(itemList);

    return (
        <ListGroup>
            {items}
        </ListGroup>
    );
}

export default ItemList;