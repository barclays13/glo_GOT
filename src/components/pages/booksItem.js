import React, {Component} from 'react';
import gotService from '../../services/gotService';
import CharDetails, {Field} from '../charDetails';

export default class BooksItem extends Component {
    gotService = new gotService();
    state = {
        selectedChar: 3
    }


    render() {
        return(
            <CharDetails 
                itemId={this.props.bookId}
                detaitData={this.gotService.getBooks}>
                <Field field='numberOfPages' label='Number of pages'/>
                <Field field='publisher' label='Publiser'/>
                <Field field='released' label='Released'/>
            </CharDetails>
        )
    }


}
