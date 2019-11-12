import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import {Button} from 'reactstrap';


export default class App extends Component {

    constructor(){
        super();
    }

    state = {
        view: true
    }

    viewRandomChar (res) {
        this.setState({
            view: !res
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
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
