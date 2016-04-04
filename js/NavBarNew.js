'use strict';

var React = require('react');
var PureRenderMixin = require('./PureRenderMixin'); // deep-equals version of PRM
var DisclaimerModal = require('./DisclaimerModal');
var RawHTML = require('./RawHTML');
var {Grid, Col, Row, Navbar, Nav, Table, NavItem,NavDropdown,
    DropdownButton, MenuItem, Modal, Button} = require('react-bootstrap');
var content = require('./content');
var Community = require('./Community');
var databaseKey = require('../databaseKey');

var {Navbar, Nav, DropdownButton} = require('react-bootstrap');

var VariantSearch = require('./VariantSearch');
var { Link} = require('react-router');

var NavLink = React.createClass({
    render: function () {
        var {children, ...otherProps} = this.props;
        return (
            <li>
                <Link {...otherProps} role='button'>
                    {children}
                </Link>
            </li>
        );
    }
});

var NavBarNew = React.createClass({
    close: function () {
        this.refs.about.setState({open: false});
    },
    getInitialState: function () {
        return {
            showModal: false
        }
    },
    getModeName: function (name) {
        return {'research_mode': 'Research Pages', 'default': 'Default Mode'}[name]
    },
    toggleMode: function () {
        this.props.toggleMode();
        this.setState({ showModal: false });
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        // Only rerender if path has change or the research mode changes, ignoring query.
        var d3TipDiv = document.getElementsByClassName('d3-tip-selection');
        if (d3TipDiv.length != 0 && d3TipDiv[0].style.opacity != '0') {
            d3TipDiv[0].style.opacity='0';
            d3TipDiv[0].style.pointerEvents='none';
        }
        return this.props.mode !== nextProps.mode ||
            this.state.showModal !== nextState.showModal ||
            this.props.path.split(/\?/)[0] !== nextProps.path.split(/\?/)[0];
    },
    activePath: function (path, tab) {
        var navPath = (path === "") ? "home" : path.split("/")[0];
        return ((navPath === tab) ? "active" : "");
    },
    render: function () {
        var {path} = this.props;
        var brand = (
            <a className="navbar-brand" href="/">
                <h1>
                    <span className="BRCA">BRCA</span>
                    <span className="exchange"> Exchange</span>
                </h1>
                {this.props.mode === 'research_mode' && <span id="research-label" className="label label-info">Research</span>}
            </a>);
        var mode_name = this.getModeName(this.props.mode);
        var other_mode = (this.props.mode === 'research_mode') ? 'default' : 'research_mode';
        return (
            <div className="navbar-container">
                <Navbar fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            {brand}
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="/">Home</NavItem>
                            <NavDropdown  className={this.activePath(path, "about")} eventKey={2} title="About"
                                         id="dropdown-about">
                                <MenuItem eventKey={2.1} href="/about/variation">BRCA1, BRCA2, and Cancer</MenuItem>
                                <MenuItem eventKey={2.2} href="/about/history">History of the BRCA Exchange</MenuItem>
                                <MenuItem eventKey={2.3} href="/about/thisSite">This Site</MenuItem>
                            </NavDropdown>
                            <NavItem eventKey={3} href='/variants'>Variants</NavItem>
                            <NavItem eventKey={4} href='/help'>Help</NavItem>
                            <NavDropdown id="dropdown-mode" className={this.activePath(path, "mode")} eventKey={5} ref='mode' title={mode_name}>
                                {this.props.mode === 'research_mode' && <MenuItem eventKey={5.1} onClick={this.toggleMode} href='/variants'>
                                    Switch to {this.getModeName(other_mode)}
                                </MenuItem> }
                                {this.props.mode === 'default' &&
                                <MenuItem eventKey={5.1} onClick={() =>this.setState({showModal: true})} href='/variants'>
                                    Switch to {this.getModeName(other_mode)}
                                </MenuItem>}
                                {this.props.mode === 'default' && this.state.showModal &&
                                <Modal onRequestHide={() => this.setState({ showModal: false })}>
                                    <RawHTML html={content.pages.researchWarning}/>
                                    <Button onClick={() => {this.toggleMode() ;}}>Yes</Button>
                                    <Button onClick={() => this.setState({ showModal: false })}>No</Button>
                                </Modal>}
                            </NavDropdown>
                            <NavItem eventKey={6} href='/community'>Community</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
});


module.exports = {
    NavLink,
    NavBarNew
};
