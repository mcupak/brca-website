var React = require('react');
var {Navigation} = require('react-router');
var backend = require('./backend');
var {Grid, Col, Row, Table} = require('react-bootstrap');
var _ = require('underscore');

var columns = [
    {title: 'Name', prop: 'Name'},
    {title: 'Abbr', prop: 'Abbr'},
    {title: 'Inheritance', prop: 'Inheritance'},
    {title: 'Code(s)', prop: 'Codes'},
    {title: 'Description', prop: 'Description'},
    {title: 'Genes', prop: 'Genes'},
    {title: 'Variants', prop: 'Variants'}
];

var Key = React.createClass({
    render() {
        var {onClick, tableKey} = this.props;
        return (
             <td className='help-target'>
                {tableKey}
                <span className="text-nowrap">
                    <span role='button' onClick={onClick}
                        className='help glyphicon glyphicon-question-sign superscript'/>
                </span>
             </td>
        );
    }
});

var DiseaseDetail = React.createClass({
    mixins: [Navigation],
    showHelp: function (title) {
        this.transitionTo(`/help#${slugify(title)}`);
    },
    componentWillMount: function () {
        backend.disease({
            name: 'breast cancer'
        }).subscribe(
            resp => {
                return this.setState({data: resp, error: null})
            },
            this.setState({error: 'Problem connecting to server'}));
    },
    render: function () {
        var {data: variant = {}, error} = this.state;
        var rows = _.map(columns, ({prop, title}) => {
            return <tr key={prop}>
                <Key tableKey={title} columns={columns} onClick={() => this.showHelp(title)}/>
                <td><span className="row-wrap">{variant[prop]}</span></td>
            </tr>
        });

        return (error ? <p>{error}</p> :
            <Grid id="main-grid">
                <Row>
                    <div className='text-center Variant-detail-title'>
                        <h3>Disease Detail</h3>
                    </div>
                </Row>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <Table striped bordered>
                            <tbody>
                                {rows}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = DiseaseDetail;