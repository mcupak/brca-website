'use strict';

var React = require('react');
var PureRenderMixin = require('./PureRenderMixin'); // deep-equals version of PRM
var {Grid, Col, Row, Button, Table} = require('react-bootstrap');
var backend = require('backend');
var {Navigation, Link} = require('react-router');
var {Pagination} = require('react-data-components-bd2k');
var _ = require('underscore');

var Community = React.createClass({
    mixins: [PureRenderMixin, Navigation],
    componentWillMount: function () {
        backend.users(this.state).subscribe(
            resp => this.setState({...resp}), // set data, count, totalPages
            () => this.setState({error: 'Problem connecting to server'}));
    },
    getInitialState: function () {
        return {
            data: [],
            pageLength: 10,
            page: 0,
            totalPages: 0,
            windowWidth: window.innerWidth
        };
    },
    fetch: function (state) {
        var {pageLength, page} = state;
        this.fetchq.onNext({pageLength,page});
    },
    setStateFetch: function (opts) {
        var newState = {...this.state, ...opts};
        this.setState(newState);
        this.fetch(newState);
    },
    onChangePage: function (pageNumber) {
        this.setStateFetch({page: pageNumber});
    },
    render: function () {
        var {data, page, totalPages, error} = this.state;

        var rows = _.map(data, row => {
            return <tr >
                <td>Placeholder Image</td>
                <td>
                    <span className="row-wrap">{row['firstName']} {row['lastName']} {row['title']}</span>
                    <span className="row-wrap">{row['affiliation']} at {row['institution']}</span>
                </td>
            </tr>
        });

        return (error ? <p>{error}</p> :
            <Grid id="main-grid">
                <Row className="btm-buffer">
                    <Col md={8} mdOffset={2} className='alert alert-info btm-buffer'>
                        <h2 className="text-center">BRCA Community pages coming soon!</h2>
                        <h4 className="text-center">Please enter your details below to be notified when the site is ready</h4>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <Link to="/signup" ><Button>Join our mailing list and this community space</Button></Link>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = Community;
