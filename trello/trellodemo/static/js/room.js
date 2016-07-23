
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
          <h2>My Boards</h2>
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
    return {boardname: ''};
  },
  handleBoardnameChange: function(e) {
    this.setState({boardname: e.target.value});
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
    this.props.onBoardSubmit({boardname: boardname, csrfmiddlewaretoken: csrftoken});
    this.setState({boardname: ''});
  },
  render: function() {
    return (
      <form className="boardForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Board name"
          onChange={this.handleBoardnameChange}
        />
        <input type="submit" value="Create" />
      </form>
    );
  }
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
