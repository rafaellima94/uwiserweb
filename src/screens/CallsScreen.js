// import React from 'react'
// import styled from 'styled-components'
// import { Redirect } from 'react-router-dom'
// import { css } from '@emotion/react'
// import HashLoader from 'react-spinners/HashLoader'
// import DataTable from 'react-data-table-component'
// import axios from 'axios'
// import NavbarFixedTop from '../components/NavbarFixedTop'
// import NavbarLeft from '../components/NavbarLeft'
// import Input from '../components/InputText'
// import ButtonRounded from '../components/ButtonRounded'
// import play from '../assets/play_icon.png'
// import playOff from '../assets/play_off_icon.png'

// const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
// `;

// const Container = styled.div`
//     flex: 1;
// `;

// const Content = styled.div`
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     margin-left: 280px;
//     padding: 124px 50px 50px;
// `;

// const CardTitle = styled.div`
//     font-size: 24px;
//     text-align: left;
//     line-height: 2rem;
//     font-family: 'Roboto', sans-serif;
//     padding: 20px;
//     background-color: #1C4370;
//     border-color: #1C4370;
//     border-radius: 6px;
//     color: #fff;
//     box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;
// `;

// const CardContainer = styled.div`
//     display: flex;
//     background-color: #fff;
//     border-radius: 4px;
//     margin-top: 40px;
//     padding: 20px;
//     align-items: flex-end;
//     flex-wrap: wrap;
// `;

// const InputLabel = styled.span`
//     margin-left: 10px;
// `;

// const InputContainer = styled.div`
//     display: flex;
//     flex-direction: column;
// `;

// const RedLabel = styled.span`
//     font-size: 18px;
//     font-weight: bold;
//     color: #C1272D;
// `;

// const BlueLabel = styled.span`
//     font-size: 18px;
//     font-weight: bold;
//     color: #1C4370;
// `;

// const GreenLabel = styled.span`
//     font-size: 18px;
//     font-weight: bold;
//     color: #026B0D;
// `;

// const Row = styled.div`
//     flex: 1;
//     display: flex;
//     flex-direction: row;
//     justify-content: space-around;
// `;

// const Select = styled.select`
//     width: 300px;
//     height: 52px;
//     font-size: 16px;
//     border-radius: 4px;
//     padding: 10px;
//     margin: 10px;
//     border-width: 1px;
//     border-style: solid;
//     border-color: #00000066;
//     color: #444;
//     ::placeholder {
//         color: #00000080;
//     }

//     &:hover {
//         border-color: #000000CC;
//     }

//     &:focus,
//     &:active {
//         outline: none;
//         border-color: #009fc2;
//         box-shadow: inset 0px 0px 0px 1px #009fc2;
//         caret-color: #009fc2;
//     }
// `;

// const Spinner = styled.div`
//     display: flex;
//     justify-content: center;
//     margin: 20px auto;
// `;

// const customStyles = {
//     rows: {
//         style: {
//             minHeight: '60px',
//         }
//     },
//     headCells: {
//         style: {
//             paddingLeft: '8px',
//             paddingRight: '8px',
//             fontSize: '18px',
//         },
//     },
//     cells: {
//         style: {
//             paddingLeft: '8px',
//             paddingRight: '8px',
//             fontSize: '16px',
//         },
//     },
// };

// export default class CallsScreen extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             redirect: localStorage.getItem('TOKEN_UWISER') == null,
//             showModal: false,
//             loading: false,
//             initial_date: '',
//             final_date: '',
//             user: '',
//             interpreter: '',
//             calls: [],
//             callsAux: [],
//             users: [],
//             interpreters: [],
//         }
//     }

//     componentDidMount() {
//         this.setState({ loading: true });
//         this.handleGetCalls();
//         this.handleGetUsers();
//         this.handleGetInterpreters();
//     }

//     handleChange = (event) => {
//         this.setState({ [event.target.name]: event.target.value });
//     }

//     handleGetCalls = () => {
//         this.setState({ loading: true });
//         var URL = `${process.env.REACT_APP_API_URL}/calls/all`;

//         axios.get(URL,
//             {
//                 headers: {
//                     Authorization: 'Bearer ' + localStorage.getItem('TOKEN_UWISER')
//                 }
//             })
//             .then(res => {
//                 this.setState({
//                     calls: res.data,
//                     callsAux: res.data,
//                     loading: false,
//                 });
//             }).catch(err => {
//                 this.setState({ loading: false });
//             });
//     }

//     handleGetUsers = () => {
//         var URL = `${process.env.REACT_APP_API_URL}/users/commom`;

//         axios.get(URL,
//             {
//                 headers: {
//                     Authorization: 'Bearer ' + localStorage.getItem('TOKEN_UWISER')
//                 }
//             })
//             .then(res => {
//                 this.setState({
//                     users: res.data,
//                 });
//             }).catch(err => {
//                 this.setState({ loading: false });
//             });
//     }

//     handleGetInterpreters = () => {
//         var URL = `${process.env.REACT_APP_API_URL}/users/translator`;

//         axios.get(URL,
//             {
//                 headers: {
//                     Authorization: 'Bearer ' + localStorage.getItem('TOKEN_UWISER')
//                 }
//             })
//             .then(res => {
//                 this.setState({
//                     interpreters: res.data,
//                 });
//             }).catch(err => {
//                 this.setState({ loading: false });
//             });
//     }

//     handleGetFilter = () => {
//         this.setState({ loading: true });
//         var aux = this.state.callsAux;
//         var initialDate = new Date(this.state.initial_date);
//         var finalDate = new Date(this.state.final_date);

//         if (this.state.initial_date != '') {
//             aux = aux.filter(call => {
//                 let date = new Date(call.startTime);
//                 return date.toISOString() >= initialDate.toISOString();
//             });
//         }

//         if (this.state.final_date != '') {
//             aux = aux.filter(call => {
//                 let date = new Date(call.startTime);
//                 return date.toISOString() <= finalDate.toISOString();
//             });
//         }

//         if (this.state.user != '') {
//             aux = aux.filter(call => call.displayName.toLowerCase().includes(this.state.user.toLowerCase()));
//         }

//         if (this.state.interpreter != '') {
//             aux = aux.filter(call => { console.log(call.otherDisplayName); return call.otherDisplayName.toLowerCase().includes(this.state.interpreter.toLowerCase()) });
//         }

//         this.setState({
//             calls: aux,
//             loading: false,
//         });
//     }

//     dateFormatter = (date) => {
//         let format = new Date(date);
//         return format.toLocaleDateString();
//     }

//     timeFormatter = (date) => {
//         let format = new Date(date);
//         return format.toLocaleTimeString();
//     }

//     currencyFormatter = (value) => {
//         return `¥ ${value.toFixed(2)}`;
//     }

//     render() {
//         const { calls, user, interpreter, initial_date, final_date, users, interpreters, loading, redirect } = this.state;

//         const columns = ([
//             {
//                 name: 'Date',
//                 selector: 'date',
//                 format: row => this.dateFormatter(row.startTime)
//             },
//             {
//                 name: 'Time',
//                 selector: 'name',
//                 format: row => this.timeFormatter(row.startTime)
//             },
//             {
//                 name: 'Duration',
//                 selector: 'duration',
//             },
//             {
//                 name: 'User',
//                 selector: 'displayName',
//             },
//             {
//                 name: 'Interpreter',
//                 selector: 'otherDisplayName',
//             },
//             {
//                 name: 'Minute price',
//                 cell: row => '¥ 50',
//             },
//             {
//                 name: 'Total price',
//                 cell: row => this.currencyFormatter((row.duration / 60) * 50),
//             },
//             {
//                 name: 'Interpreter receives',
//                 cell: row => this.currencyFormatter((row.duration / 60) * 50 * 0.8979),
//             },
//             {
//                 width: '100px',
//                 name: 'Recording',
//                 cell: row => <img src={play} style={{ width: '40px', height: '40px', }} />,
//                 ignoreRowClick: true,
//                 allowOverflow: true,
//                 button: true,
//             },
//         ]);

//         if (redirect) {
//             return <Redirect to="/" />
//         } else {
//             return (
//                 <Container style={{ background: '#E1E1E1' }}>
//                     <NavbarFixedTop />
//                     <NavbarLeft />
//                     <Content>
//                         <CardTitle>CALLS</CardTitle>
//                         <CardContainer>
//                             <InputContainer>
//                                 <InputLabel>Initial Date</InputLabel>
//                                 <Input type='date' placeholder='Initial Date' name='initial_date' value={initial_date} change={this.handleChange} format='MM/dd/yyyy' />
//                             </InputContainer>
//                             <InputContainer>
//                                 <InputLabel>Final Date</InputLabel>
//                                 <Input type='date' placeholder='Final Date' name='final_date' value={final_date} change={this.handleChange} format='MM/dd/yyyy' />
//                             </InputContainer>
//                             <InputContainer>
//                                 <InputLabel>User</InputLabel>
//                                 <Select
//                                     name='user'
//                                     value={user}
//                                     onChange={this.handleChange}>
//                                     <option value=''>User</option>
//                                     {
//                                         users.map(user => <option key={user.id} value={user.name}>{user.name}</option>)
//                                     }
//                                 </Select>
//                             </InputContainer>
//                             <InputContainer>
//                                 <InputLabel>Interpreter</InputLabel>
//                                 <Select
//                                     name='interpreter'
//                                     value={interpreter}
//                                     onChange={this.handleChange}>
//                                     <option value=''>Interpreter</option>
//                                     {
//                                         interpreters.map(interpreter => <option key={interpreter.id} value={interpreter.name}>{interpreter.name}</option>)
//                                     }
//                                 </Select>
//                             </InputContainer>
//                             <ButtonRounded type='button' title='filtrar' click={this.handleGetFilter} />
//                         </CardContainer>
//                         <CardContainer>
//                             <Row>
//                                 <RedLabel>Total de registros: {calls.length}</RedLabel>
//                                 <BlueLabel>Custo total das ligações: {this.currencyFormatter(calls.reduce((a, b) => { return a + (b.duration / 60) * 50; }, 0))}</BlueLabel>
//                                 <GreenLabel>Custo total intérprete a receber: {this.currencyFormatter(calls.reduce((a, b) => { return a + ((b.duration / 60) * 50) * 0.8979; }, 0))}</GreenLabel>
//                             </Row>
//                         </CardContainer>
//                         <CardContainer>
//                             {
//                                 loading ?
//                                     <Spinner>
//                                         <HashLoader css={override} size={100} color={"#1C4370"} loading={this.state.loading} speedMultiplier={1.5} />
//                                     </Spinner>
//                                     :
//                                     <DataTable
//                                         noHeader={true}
//                                         columns={columns}
//                                         data={calls}
//                                         paginationRowsPerPageOptions={[10, 25, 50, 100]}
//                                         paginationPerPage={10}
//                                         pagination={true}
//                                         noDataComponent={''}
//                                         customStyles={customStyles}
//                                         style={{}} />
//                             }
//                         </CardContainer>
//                     </Content>
//                 </Container>
//             )
//         }
//     }
// }