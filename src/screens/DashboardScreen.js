import React from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import NavbarTop from '../components/NavbarFixedTop'
import NavbarLeft from '../components/NavbarLeft'
import Users from '../assets/users_icon.png'
import Interpreters from '../assets/interpreters_icon.png'
import Busy from '../assets/busy_icon.png'
import Calls from '../assets/calls_icon.png'

const Container = styled.div`
    flex: 1;
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 280px;
    padding: 124px 50px 50px;
`;

const CardTitle = styled.div`
    font-size: 24px;
    text-align: left;
    line-height: 2rem;
    font-family: 'Roboto', sans-serif;
    padding: 20px;
    background-color: #1C4370;
    border-color: #1C4370;
    border-radius: 6px;
    color: #fff;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;
`;

const CardContainer = styled.div`
    display: flex;
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
`;

const InfoCardContainer = styled.div`
    display: flex;
    background-color: ${props => props.clients_online ? '#4AB1B9' : props.interpreters_online ? '#4AB964' : props.interpreters_busy ? '#C1272D' : '#1C4370'};
    border-radius: 6px;
    margin: 20px;
    align-items: center;
    flex-direction: row;
    width: 360px;
    height: 100px;
    padding: 40px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const InfoCardText = styled.span`
    color: #fff;
    font-weight: bold;
    font-size: 40px;
    margin: 0 15px;
`;

const InfoCardLabel = styled.span`
    color: #fff;
    font-size: 18px;
`;

const Icon = styled.img`
    color: #fff;
    height: 50px;
    width: 50px;
`;

export default class DashboardScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: localStorage.getItem('TOKEN') == null,
            showModal: false,
            loading: false,
            action: '',
            teacher: '',
            initial_date: '',
            final_date: '',
            audits: [],
            modalAction: '',
            modalTitle: '',
            modalDescription: '',
            modalTeacher: '',
            modalStudent: '',
            modalDate: '',
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.handleGet();
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleGet = () => {
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/" />
        } else {
            return (
                <Container style={{background: '#E1E1E1'}}>
                    <NavbarTop />
                    <NavbarLeft />
                    <Content>
                        <CardTitle>DASHBOARD</CardTitle>
                        <CardContainer>
                            <Row>
                                <InfoCardContainer clients_online>
                                    <Icon src={Users} />
                                    <InfoCardText>150</InfoCardText>
                                    <InfoCardLabel>CLIENTES ONLINE</InfoCardLabel>
                                </InfoCardContainer>
                                <InfoCardContainer interpreters_online>
                                    <Icon src={Interpreters} />
                                    <InfoCardText>52</InfoCardText>
                                    <InfoCardLabel>INTÉRPRETES ONLINE</InfoCardLabel>
                                </InfoCardContainer>
                            </Row>
                            <Row>
                                <InfoCardContainer interpreters_busy>
                                    <Icon src={Busy} />
                                    <InfoCardText>32</InfoCardText>
                                    <InfoCardLabel>INTÉRPRETES OCUPADOS</InfoCardLabel>
                                </InfoCardContainer>
                                <InfoCardContainer>
                                    <Icon src={Calls} />
                                    <InfoCardText>96</InfoCardText>
                                    <InfoCardLabel>CHAMADAS HOJE</InfoCardLabel>
                                </InfoCardContainer>
                            </Row>
                        </CardContainer>
                    </Content>
                </Container>
            )
        }
    }
}