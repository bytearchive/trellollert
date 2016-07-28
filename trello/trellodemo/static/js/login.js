            var Button = ReactBootstrap.Button;
            var Form = ReactBootstrap.Form;
            var FormGroup = ReactBootstrap.FormGroup;
            var FormControl = ReactBootstrap.FormControl;



            var LoginBox = React.createClass({
              handleLoginSubmit: function(comment) {
                $.ajax({
                  url: this.props.url,
                  dataType: 'json',
                  type: 'POST',
                  data: comment,
                  success: function(data) {
                    this.setState({data: data});
                  }.bind(this),
                  error: function(xhr, status, err) {
                    this.setState({data: comment});
                    console.error(this.props.url, status, err.toString());
                  }.bind(this)
                });
              },
              getInitialState: function() {
                return {data: []};
              },
              render: function() {
                return (
                  <div className="loginBox">
                    <h1>Login</h1>
                    <LoginForm onLoginSubmit={this.handleLoginSubmit} />
                  </div>
                );
              }
            });

            var LoginForm = React.createClass({
              getInitialState: function() {
                return {username: '', password: ''};
              },
              handleUsernameChange: function(e) {
                this.setState({username: e.target.value});
              },
              handlePasswordChange: function(e) {
                this.setState({password: e.target.value});
              },
              handleSubmit: function(e) {
                e.preventDefault();
                var username = this.state.username.trim();
                var password = this.state.password.trim();
                if (!username || !password) {
                  return;
                }
                this.props.onLoginSubmit({username: username, password: password});
                this.setState({username: '', password: ''});
              },
              render: function() {
                return (
                    <div className="loginForm">
                        <Form inline onSubmit={this.handleSubmit}>
                          <FormGroup controlId="formInlineLogin">
                            <FormControl type="text" placeholder="Username" onChange={this.handleUsernameChange}/>
                            <FormControl type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
                            <Button type="submit" onClick={this.handleSubmit}> Sign In </Button>
                          </FormGroup>
                        </Form>
                    </div>
                );
              }
            });



ReactDOM.render(
  <LoginBox />,
  document.getElementById('mount_node')
);