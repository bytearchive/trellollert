
var Button = ReactBootstrap.Button;
var Jumbotron = ReactBootstrap.Jumbotron;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;
var Form = ReactBootstrap.Form;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel;
var Popover = ReactBootstrap.Popover;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var Overlay = ReactBootstrap.Overlay;


var Room = React.createClass({
  loadBoardsFromServer: function() {
//    var user = document.getElementById('alpha').innerHTML;
//    console.log(user);
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleBoardSubmit: function(board) {
    var boards = this.state.data;
    board.id = Date.now();
    var newBoards = boards.concat([board]);
    this.setState({data: newBoards});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: board,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: boards});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadBoardsFromServer();
    setInterval(this.loadBoardsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="room">
        <Grid>
          <h2>My Room</h2>
          <BoardList data={this.state.data} />
          <BoardForm onBoardSubmit={this.handleBoardSubmit} />
        </Grid>
      </div>  
    );
  }
});

var BoardList = React.createClass({
  render: function() {
    var boardNodes = this.props.data.map(function(board) {
      return (
        <Board boardname={board.boardname} key={board.id} boardid={board.id}>
          {board.boardname}
        </Board>
      );
    });
    return (
      <div className="boardList">
        {boardNodes}
      </div>
    );
  }
});


var BoardForm = React.createClass({
  getInitialState: function() {
    return {boardname: '', show:false};
  },
  handleBoardnameChange: function(e) {
    this.setState({boardname: e.target.value, show:this.state.show});
  },
  toggle:function () {
    this.setState({boardname: this.state.boardname,show: !this.state.show})
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var boardname = this.state.boardname.trim();
    console.log(boardname);
    console.log("$");
    if (!boardname) {
      return;
    }
    this.setState({boardname: '',show: false});
    this.props.onBoardSubmit({boardname: boardname, csrfmiddlewaretoken: csrftoken});

  },
  render: function() {

    var popoverStyle={
      position: 'absolute',
      backgroundColor: '#EEE',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
      border: '1px solid #CCC',
      borderRadius: 3,
      marginLeft: -240,
      marginTop:-10,
      padding: 25,
    };

    var popoverHoverFocus = (
      <Popover style={popoverStyle} id="popover2">
        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup controlId="formInlineCardName">
            <FormControl type="text" placeholder="+ board" onChange={this.handleBoardnameChange}/>
          </FormGroup>
        </Form>
      </Popover>
    );

    var jumboStyle = {backgroundColor: "#DCD1CE",};

    return (
      <div className="boardForm">
        <Grid>
          <Row>
            <Col md={3}>
              <OverlayTrigger trigger="click" rootClose overlay={popoverHoverFocus}>
                <Jumbotron style={jumboStyle}>
                  <h3>Add Board</h3>
                </Jumbotron>
              </OverlayTrigger>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

const CustomPopover = React.createClass({
  render() {
    return (
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#EEE',
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
          border: '1px solid #CCC',
          borderRadius: 3,
          marginLeft: 0,
          marginTop:-15,
          padding: 10,
        }}
      >
        <strong>Holy guacamole!</strong> Check this info.
      </div>
    );
  },
});

var Board = React.createClass({

  render: function() {

    var jumboStyle={backgroundColor:"#088A08", color:"white"};



    return (
      <div className="board">
        <Col md={3}>

        <a href={'' + this.props.boardid}>
          <Jumbotron style={jumboStyle}>
            <h3>{this.props.boardname}</h3>
          </Jumbotron>
        </a>

        </Col>
      </div>
    );
  }
});


ReactDOM.render(
  <Room url="/trello/room/" pollInterval={5000}/>,
  document.getElementById('boards_list_react')
);
