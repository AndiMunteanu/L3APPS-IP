import React from "react";
//import { Redirect } from "react-router-dom";
import {
    Container,
    List,
    Tab,
    Image,
    Segment,
    Grid,
    Header,
    Divider,
    Dropdown,
    Table
} from "semantic-ui-react";
import Cookies from "universal-cookie";
import MyHeader from "../../../Header";
//import ProgressButton from "./ProgressButton.js";
import axios from "axios";
//const baseurl = "http://localhost:8081";

const baseUrl = "http://localhost:8081";
const cookies = new Cookies();
const userId = cookies.get("user_id");

const selectOptions = [
    {
        key: "Relaxed",
        text: "Relaxed",
        value: "Relaxed"
    },
    {
        key: "Focused",
        text: "Focused",
        value: "Focused"
    },
    {
        key: "Tired",
        text: "Tired",
        value: "Tired"
    }
];

class ViewProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            surname: "",
            email: "",
            job: "",
            employees: []
        };
    }
    componentDidMount() {
        fetch("http://localhost:8081/get-profile/" + cookies.get("user_id"))
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log("response is", response[1][0]);
                this.setState({
                    name: response[1][0].nume,
                    surname: response[1][0].prenume,
                    email: response[1][0].email
                });
                //il punem in state
                fetch("http://localhost:8081/viewUnderlings/" + cookies.get("user_id"))
                    .then(responsee => {
                        return responsee.json();
                    })
                    .then(responsee => {
                        this.setState({
                            employees: responsee[1]
                        });
                        console.log("State is ", this.state);
                    });
            })
            .then((res)=>{
                fetch("http://localhost:8081/get-position/" + cookies.get("user_id"))
                .then(res=>{
                    return res.json()
                })
                .then(res=>{
                    console.log("Position:",res[1].position);
                    this.setState({
                        job: res[1].position
                    })
                })
            })
            .then((res)=>{
                fetch("http://localhost:8081/viewUnderlings/"+cookies.get("user_id"))
            })
            .catch(err => {
                alert("No profile's for you !");
            });
    }
    render() {
        return (
            <Tab.Pane>
                <Container textAlign="justified">
                    <Grid>
                        <Grid.Row>
                            {/* <Grid.Column width={5} textAlign="center">
                                <Image
                                    src="https://steamuserimages-a.akamaihd.net/ugc/960838928914191885/31FF51C2135DAD7CB3BF2A2F2142DF0D2177A113/?imw=1024&imh=1024&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
                                    alt="avatar"
                                    size="small"
                                    centered
                                />
                            </Grid.Column> */}

                            <Grid.Column className="profileData">
                                {/* <Divider hidden /> */}
                                <Segment.Group>
                                    <Segment>
                                        <Header as="h4">Name : {this.state.name}</Header>
                                    </Segment>
                                    <Segment>
                                        <Header as="h4">Surname: {this.state.surname}</Header>
                                    </Segment>
                                    <Segment>
                                        <Header as="h4">Email : {this.state.email}</Header>
                                    </Segment>
                                    <Segment>
                                        <Header as="h4">Job : {this.state.job} </Header>
                                    </Segment>
                                </Segment.Group>
                            </Grid.Column>
                        </Grid.Row>
                        {/* <Grid.Row>
                            <Grid.Column>
                                <Header as="h4" attached="top">
                                    Your Tasks
                                </Header>
                                <Segment color="red" secondary attached>
                                    Planurile tale
                                </Segment>
                            </Grid.Column>
                        </Grid.Row> */}

                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h4" attached="top">
                                    Preferences
                                </Header>
                                <Segment color="green" secondary attached>
                                    <List horizontal divided relaxed>
                                        <List.Item>
                                            <List.Content>Morning: Focused</List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content>Evening: Tired</List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content>Noon: Relaxed</List.Content>
                                        </List.Item>
                                    </List>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Table color="teal" key="teal">
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Employee</Table.HeaderCell>
                                        <Table.HeaderCell>Job</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                {/* {listEmployees} */}
                            </Table>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Tab.Pane>
        );
    }
}

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prenume: "",
            nume: "",
            email: "",
            parola: ""
        };
        axios.get(`${baseUrl}/get-profile/${userId}`).then(response => {
            this.setState({
                prenume: response.data[1][0].prenume,
                nume: response.data[1][0].nume,
                email: response.data[1][0].email
            });
        });
    }
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    componentDidUpdate() {
        for (let property in this.state) {
            if (this.state[property]) {
                axios
                    .get(`${baseUrl}/edit-profile/${userId}/${property}/${this.state[property]}`)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
    render() {
        const { prenume, nume, email, parola } = this.state;
        return (
            <Tab.Pane>
                {" "}
                <Container textAlign="justified">
                    <Segment.Group>
                        <Segment color="red">
                            <Header as="h4">Change First Name:</Header>
                            <div className="ui fluid icon input">
                                <i aria-hidden="true" className="users icon" />
                                <input
                                    name="prenume"
                                    type="text"
                                    value={prenume}
                                    placeholder="Change First Name..."
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </Segment>
                        <Segment color="red">
                            <Header as="h4">Change Last Name:</Header>
                            <div className="ui fluid icon input">
                                <i aria-hidden="true" className="users icon" />
                                <input
                                    name="nume"
                                    type="text"
                                    value={nume}
                                    placeholder="Change Last Name..."
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </Segment>
                        <Segment color="red">
                            <Header as="h4">Change Email:</Header>
                            <div className="ui fluid icon input">
                                <input
                                    name="email"
                                    type="text"
                                    value={email}
                                    placeholder="Change Email..."
                                    onChange={this.changeHandler}
                                />
                                <i aria-hidden="true" className="mail icon" />
                            </div>
                        </Segment>
                        <Segment color="red">
                            <Header as="h4">Change Password:</Header>
                            <div className="ui fluid icon input">
                                <input
                                    name="parola"
                                    type="password"
                                    value={parola}
                                    placeholder="Change Password..."
                                    onChange={this.changeHandler}
                                />
                                <i aria-hidden="true" className="lock icon" />
                            </div>
                        </Segment>

                        <Segment color="red" secondary>
                            <Grid>
                                <Grid.Column width={8}>
                                    <Header as="h4" attached="top">
                                        Difficulty
                                    </Header>
                                    <Segment attached color="red">
                                        <List divided relaxed>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Header>Morning</List.Header>
                                                    <Dropdown
                                                        placeholder="Select Difficulty"
                                                        fluid
                                                        selection
                                                        options={selectOptions}
                                                    />
                                                </List.Content>
                                            </List.Item>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Header>Afternoon</List.Header>
                                                    <Dropdown
                                                        placeholder="Select Difficulty"
                                                        fluid
                                                        selection
                                                        options={selectOptions}
                                                    />
                                                </List.Content>
                                            </List.Item>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Header>Evening</List.Header>
                                                    <Dropdown
                                                        placeholder="Select Difficulty"
                                                        fluid
                                                        selection
                                                        options={selectOptions}
                                                    />
                                                </List.Content>
                                            </List.Item>
                                        </List>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Header as="h4" attached="top">
                                        Job
                                    </Header>
                                    <Segment attached color="red">
                                        <List divided relaxed>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Header>Job Name</List.Header>
                                                    <div className="ui fluid icon input">
                                                        <input
                                                            name="jobName"
                                                            type="text"
                                                            placeholder="Change Job Name..."
                                                        />
                                                    </div>
                                                </List.Content>
                                            </List.Item>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Header>Function</List.Header>
                                                    <div className="ui fluid icon input">
                                                        <input
                                                            name="myFunction"
                                                            type="text"
                                                            placeholder="Change Function..."
                                                        />
                                                    </div>
                                                </List.Content>
                                            </List.Item>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Header>Category</List.Header>
                                                    <div className="ui fluid icon input">
                                                        <input
                                                            name="category"
                                                            type="text"
                                                            placeholder="Change Category..."
                                                        />
                                                    </div>
                                                </List.Content>
                                            </List.Item>
                                        </List>
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Segment.Group>
                </Container>
            </Tab.Pane>
        );
    }
}
class Profile extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <div
                className="Profile"
                onLoad={() => {
                    console.log("Profile");
                }}
            >
                <MyHeader />
                <Divider hidden />
                <Container textAlign="justified">
                    <Segment color="red">
                        <Tab
                            menu={{ secondary: true, pointing: true }}
                            panes={[
                                {
                                    menuItem: "Profile Information",
                                    render: () => <ViewProfile />
                                },
                                {
                                    menuItem: "Edit Information",
                                    render: () => <EditProfile />
                                }
                            ]}
                        />
                    </Segment>
                </Container>
            </div>
        );
    }
}

export default Profile;