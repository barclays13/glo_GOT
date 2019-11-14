import React, {Component} from 'react';
import ItemList from '../../itemList';
import CharDetails, {Field} from '../../charDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class BooksPage extends Component {

    gotService = new gotService();
    state = {
        selectedChar: 30,
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
            getData={this.gotService.getAllHouses}
            renderItem={({name, region}) => `${name} (${region})`}/>
        );

        const charDetails = (
                <CharDetails 
                    itemId={this.state.selectedChar}
                    detaitData={this.gotService.getHouses}>
                    <Field field='region' label='Region'/>
                    <Field field='words' label='Words'/>
                    <Field field='titles' label='Titles'/>
                    
                </CharDetails>
        );
        return (
            <RowBlock left={itemList} right={charDetails}/>
        );
    }
}