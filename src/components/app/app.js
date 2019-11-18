import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {Button} from 'reactstrap';
import {BooksPage, HousesPage, CharacterPage, BooksItem} from '../pages';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';
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
            <Router>
                <div className="app"> 
                    <Container>
                        <Header/> 
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
                        <Route path='/characters'  component={CharacterPage} />
                        <Route path='/houses'  component={HousesPage} />
                        <Route path='/books' exact component={BooksPage} />
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                            return <BooksItem bookId={id}/>}
                        }/>
                    </Container>
                </div>
            </Router>
        );
    }
}
