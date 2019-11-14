import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Spinner from '../spinner/';
export default class ItemList extends Component {

    state = {
        itemList: null
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then( (itemList) => {
                this.setState({
                    itemList
                })
            });
    }

    rendersItems(arr) {
        return arr.map((item) => {
            const id = item.url.match(/\/([^\/]+)\/?$/)[1];
            const label = this.props.renderItem(item);
            return (
                <ListGroupItem
                    style ={{cursor: "pointer"}}
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </ListGroupItem>
            )
        })
    }

    render() {
        const {itemList} = this.state;

        if (!itemList) {
            return <Spinner/>
        }

        const items = this.rendersItems(itemList);

        return (
            <ListGroup>
                {items}
            </ListGroup>
        );
    }
}