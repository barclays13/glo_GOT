import React, {Component} from 'react';
import ItemList from '../../itemList';
import CharDetails, {Field} from '../../charDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class BooksPage extends Component {

    gotService = new gotService();

    state = {
        selectedChar: 130,
        error: false
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        });
    }

    render () {

        if (this.state.error) {
            return <ErrorMessage/>
        };

        const itemList = (
            <ItemList 
            onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllBooks}
            getDetailsData={this.gotService.getBooks}
            renderItem={({name}) => name }/>
        );

        const charDetails = (
                <CharDetails charId={this.state.selectedChar}>
                    <Field field='numberOfPages' label='Number of pages'/>
                    <Field field='publiser' label='Publiser'/>
                    <Field field='released' label='Released'/>
                </CharDetails>
        );

        return (
            <RowBlock left={itemList} right={charDetails}/>
        );
    }
}