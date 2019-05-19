import React, { Component } from "react";
import { Icon, Menu, Dropdown, Image, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import faker from "faker";
import "../style/App.css";

import CreatePlanModal from "./Comp/CreatePlanModal.js";
import CreateTaskModal from "./Comp/CreateTaskModal.js";
import CreateSubTaskModal from "./Comp/CreateSubTaskModal.js";
import EditPlan from "./Comp/EditPlanModal";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    handleItemClick = (e, { name }) => this.setState({ activeItem: name });
    render() {
        const trigger = (
            <span>
                <Image avatar src={faker.internet.avatar()} />{" "}
                {faker.name.findName()}
            </span>
        );

        const options = [
            { key: "user", text: "Account", icon: "user", path: "/profile" },
            {
                key: "settings",
                text: "Settings",
                icon: "settings",
                path: "/settings"
            },
            {
                key: "sign-out",
                text: "Sign Out",
                icon: "sign out",
                path: "/login"
            }
        ];

        const { activeItem } = this.state;

        return (
            <Menu size="mini" inverted>
                <Menu.Item>
                    <img src=".\logo.png" />
                </Menu.Item>
                <Menu.Menu position="left">
                    <div className="ui left aligned category search item">
                        <div className="ui transparent icon input">
                            <input
                                className="prompt"
                                type="text"
                                placeholder="Search..."
                            />
                            <i className="search link icon" />
                        </div>
                        <div className="results" />
                    </div>
                </Menu.Menu>
                <Menu.Item
                    name="Dashboard"
                    active={activeItem === "Dashboard"}
                    onClick={() => {
                        //this.handleItemClick;
                    }}
                >
                    Dashboard
                </Menu.Item>

                <Menu.Item
                    name="Activity"
                    active={activeItem === "Activity"}
                    onClick={this.handleItemClick}
                >
                    Activity
                </Menu.Item>

                <Menu.Item
                    name="Plans"
                    active={activeItem === "Plans"}
                    onClick={this.handleItemClick}
                >
                    Plans
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item
                        name="Add"
                        active={activeItem === "Add"}
                        onClick={this.handleItemClick}
                    >
                        <Dropdown icon="add large">
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <CreatePlanModal />
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <CreateTaskModal />
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <CreateSubTaskModal />
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <EditPlan />
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item
                        name="gamepad"
                        active={activeItem === "gamepad"}
                        onClick={this.handleItemClick}
                    >
                        <Icon className="mail large" />
                    </Menu.Item>
                    <Menu.Item
                        name="User"
                        active={activeItem === "User"}
                        onClick={this.handleItemClick}
                    >
                        <Dropdown
                            trigger={trigger}
                            options={options}
                            onClick={() => {
                                console.log(options);
                            }}
                            pointing="top left"
                            icon={null}
                        />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}
