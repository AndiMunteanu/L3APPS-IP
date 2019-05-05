import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import faker from "faker";
import MyHeader from "./Header";
import Plan from "./Dashboard/cardplan";
import Task from "./Dashboard/cardtask";
import Subtask from "./Dashboard/cardsubtask";
import {
    Divider,
    Header,
    Segment,
    Icon,
    Menu,
    Dropdown,
    Image,
    Input,
    Label,
    List,
    Grid
} from "semantic-ui-react";

import "../style/Dashboard/App.css";

export default class dash extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="dashContainer">
                <MyHeader />
                <div className="dashFlex">
                    <Grid columns="equal">
                        <Grid.Column width={8}>
                            <Subtask />
                        </Grid.Column>
                        <Grid.Column>
                            <Grid columns="equal">
                                <Grid.Row>
                                    <Task />
                                </Grid.Row>
                                <Grid.Row>
                                    <Plan />
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
        );
    }
}