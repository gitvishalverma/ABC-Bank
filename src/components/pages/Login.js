import React, { Component } from 'react';
import { Card, CardText, CardTitle, Button } from 'react-mdl';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions'
import renderField from '../common/renderformfields'
import abc from './abc.jpg';
import validate from '../../utils'

class Login extends Component {

  constructor()
    {
      super();
        this.state={
            list:null,
            username:"",
            pass:"",
            errorMessage:""
        }
    }
    
  componentWillUpdate(nextProps){
    if(nextProps.error&&nextProps.error.message)
    {
      this.setState({errorMessage:nextProps.error.message})
    }
      if(nextProps.loggedIn){
          if(nextProps.user){            
              this.props.history.push('/accounts');
          }
          else{
            this.props.getUser();
          }
        }
    }

      
      
    onSubmit=(e) => {
      e.preventDefault();
      this.props.authenticateUser(this.state.username,this.state.pass);
    }



  render() {

    /*const {loggedIn, error, user} = this.props;
    
    if(error)
    {
      console.log("this.props.error",error);
    }*/
    return (
      
      <div><br/><br/><br/>
        <Card shadow={1} style={{width: '100%', maxWidth: '400px', margin: 'auto'}}>
          <CardTitle expand style={{ minHeight: '150px', background: `url(${ abc }) center / cover` }}>
          
          </CardTitle>
            <form onSubmit={this.onSubmit}>
            <br/><br/>
            {this.state.errorMessage ? <div style={{textAlign:'center', color:'red', border:'1px grey', borderRadius:'10px', backgroundColor: 'lightgrey', padding:'10px', fontWeight:'bold'}}>
                {this.state.errorMessage}
              </div> :null}
                <CardText>
                <div>
                    <Field name="username" component={renderField} type="text" label="Email or Username" onChange={event => {this.state.username=event.target.value}}/>
                </div>
                <div>
                    <Field name="password" component={renderField} type="password" label="Password" onChange={event => {this.state.pass=event.target.value}}/>
                </div>
                </CardText>
                <Button colored style={{fontSize:"20px",width: '40%', maxWidth: '400px', margin: 'auto'}} type="submit" >Login</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button colored style={{fontSize:"10px",color:'black', margin: 'auto'}} type="submit" onClick={()=>this.props.history.push("/forgot")}>Forgot Username or Password? </Button>
            </form>

            <Button colored style={{width: '100%',backgroundColor:'black',color:'white', maxWidth: '400px', margin: 'auto'}}type="submit" onClick={()=>this.props.history.push("/register")}>New to ABC Bank? Create an account</Button>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loggedInDetails.loggedIn,
        error: state.loggedInDetails.error,
        user: state.loggedInDetails.user
    }
}

export default connect(mapStateToProps, actions)(reduxForm({
    form: 'Login',
    validate
})(Login));
