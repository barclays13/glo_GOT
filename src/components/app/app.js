import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {Button} from 'reactstrap';
import CharacterPage from '../pages/characterPage';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import BooksPage from '../pages/booksPage'
import gotService from '../../services/gotService';
export default class App extends Component {

    gotService = new gotService();
    state = {
        view: true
    }

    viewRandomChar (res) {
        this.setState({
            view: !res
        })
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    render() {
        const {view} = this.state;
        const viewRandomBlock = view ? <RandomChar/> : null;

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {viewRandomBlock}
                            <Button 
                                outline 
                                color="secondary" 
                                style={{width:100+"%", marginTop: -35+"px"}}
                                onClick={() => this.viewRandomChar(view)} >Hide/Show</Button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <BooksPage/>
                        <Row>
                            <Col md='6'>
                                <ItemList 
                                    onItemSelected={this.onItemSelected}
                                    getData={this.gotService.getAllHouses}
                                    renderItem={(item) => item.name }/>
                            </Col>
                            <Col md='6'>
                                <CharDetails charId={this.state.selectedChar}/>
                            </Col>
                        </Row>
                </Container>
            </>
        );
    }
}
