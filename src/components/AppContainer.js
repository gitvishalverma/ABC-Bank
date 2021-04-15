import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Grid, Cell, Icon, Header, HeaderRow, HeaderTabs, Tab, Content, Button, Navigation, Chip, ChipContact } from 'react-mdl';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Route, Switch} from 'react-router-dom';
import RequireAuth from './higherordercomponents/requireauthentication'



const Login = React.lazy(()=>import('./pages/Login'));
const Accounts = React.lazy(()=>import('./pages/Accounts'));
const BalanceTransfer = React.lazy(()=>import('./pages/BalanceTransfers'));
const Admin = React.lazy(()=>import('./pages/Admin'));


class AppContainer extends Component {

 renderChip() {
      if(this.props.loggedIn)
      {
          if(this.props.user && this.props.user.name)
          {
              return(
              <Chip>
                  <ChipContact className="mdl-color--teal mdl-color-text--white">{this.props.user.name.substring(0,1)}</ChipContact>
                  {this.props.user.name}
              </Chip>
          )
        }
      }else {
          return null;
      }

  }

  render() {

    if(this.props.user && this.props.user.admin){
        return <Admin name={this.props.user.name}/>
    }
    
    const tabMap = {
        0: {
            URL: '/',
            Title: 'Login',
            tabIndex: 0
        },
        1: {
            URL: '/accounts',
            Title: 'Accounts',
            tabIndex: 1
        },
        2: {
            URL: '/transfer',
            Title: 'Balance Transfer',
            tabIndex: 2
        }
    }

    const urlPath= window.location.pathname;
    let activeTabId;
    if(urlPath){
        const value = Object.values(tabMap).filter((tab) => {
            return tab.URL === urlPath;
        });

        activeTabId =  value[0].tabIndex;
    }else{
        activeTabId = 0;
    }

    return (
        <div>
        <Layout fixedHeader>
            <Header style={{backgroundColor:'orange'}}>
                <HeaderRow title={(
                  <span>
                    <Icon style={{fontSize: '38px', position: 'relative', top: '5px'}}/>
                    <span style={{marginLeft: '500px'}}>Welcome to ABC Bank</span>
                  </span>
                )} >

                    {this.renderChip()}

                </HeaderRow>
                <HeaderTabs ripple activeTab={activeTabId} onChange={(tabId) => {
                    if(tabId === 0 && this.props.loggedIn){
                        this.props.logoutUser();
                    }
                    this.props.history.replace(tabMap[tabId].URL);
                }}>
                    <Tab >{this.props.loggedIn? 'Logout': 'Login'}</Tab>
                    <Tab>Accounts</Tab>
                    <Tab>Fund Transfers</Tab>
                    <Tab>Messages</Tab>
                    <Tab>New Conversation</Tab>
                    <Tab>View Conversation</Tab>
                    <Tab>Apply for Loan</Tab>
                </HeaderTabs>
            </Header>
            <Content>


              <div >
                  <Grid>
                      <Cell col={12} tablet={8} phone={4} >
                    <Switch>
                        <Route exact path="/" component={Login} />                        
                        <Route path="/accounts" component={RequireAuth(Accounts)}/>
                        <Route path="/transfer" component={RequireAuth(BalanceTransfer)}/>
                    </Switch>
                      </Cell>
                  </Grid>
              </div>

            </Content>
        </Layout>
        </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loggedInDetails.loggedIn,
        user: state.loggedInDetails.user
    }
}


export default connect(mapStateToProps, actions)(AppContainer);
