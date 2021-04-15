import React, { Component } from 'react';
import { Card, CardTitle, DataTable, TableHeader, Button, Layout, Header, HeaderRow, Content, Grid, Cell, Chip, ChipContact } from 'react-mdl';
import * as action from '../../actions'

class Admin extends Component {
    state={
        user:null
    };

    async componentDidMount(){
        const url="https://my-json-server.typicode.com/gitvishalverma/db2/accounts";
        const response= await fetch(url);
        const data= await response.json();
        console.log(data);
        this.setState({user:data})
    }

    renderChip(){
        if(this.props.user)
          {
              return(
              <Chip>
                  <ChipContact className="mdl-color--teal mdl-color-text--white">{this.props.name.substring(0,1)}</ChipContact>
                  {this.props.name}
              </Chip>
          )
        }
    }

    renderTransactions() {
        return (
            <DataTable
                selectable
                shadow={1}
                style={{textAlign:'center'}}
                rowKeyColumn="id"
                rows={this.state.user.map((list) => {
                    return {id: list.id, account: list.accountNo, balance: list.balance, name: list.owner.name, email: list.owner.email, type :list.type, des: list.description, created: list.createdAt}
                })}>
                    <TableHeader name="account" tooltip="Account Number" style={{textAlign:'center'}}>Account Number</TableHeader>
                    <TableHeader numeric name="balance" tooltip="Current Balance" style={{textAlign:'center'}}>Current Balance</TableHeader>
                <TableHeader name="name" tooltip="Account Holder" style={{textAlign:'center'}}>Account Holder</TableHeader>
                <TableHeader name="email" tooltip="Email Address" style={{textAlign:'center'}}>Email</TableHeader>
                    <TableHeader name="type" tooltip="Account Type" style={{textAlign:'center'}}>Account Type</TableHeader>
                    <TableHeader name="des" tooltip="Description" style={{textAlign:'center'}}>Description</TableHeader>
                    <TableHeader name="created" tooltip="Created On" style={{textAlign:'center'}}>Created On</TableHeader>
            </DataTable>
        )  
    }

    render() {
            if(this.state.user){
          return (
            <div>
            <Layout fixedHeader>
                <Header style={{backgroundColor:'orange'}}>
                    <HeaderRow title={(
                      <div style={{textAlign:'center', width:'100%'}}>
                        <span style={{ marginLeft: '500px'}}>Welcome to ABC Bank</span>
                      </div>
                    )} >
                        {this.renderChip()}
                    </HeaderRow>
                    </Header>
                    <Header style={{backgroundColor:'#111'}}>
                    <HeaderRow title={(
                      <div style={{textAlign:'center', width:'100%'}}>
                        <span style={{ marginLeft: '530px', color:'green', fontWeight:'bold'}}>Admin Account</span>
                      </div>
                    )} >
                    </HeaderRow>
                    </Header>

                <Content>


              <div >
                  <Grid>
                      <Cell col={12} tablet={8} phone={4} >

                      <Card shadow={1} style={{width: '100%', margin: 'auto'}}>
                <CardTitle style={{display: 'block'}}>
                    <span style={{padding: '25px'}}>
                        List of Users
                    </span>
                    <span>
                    <Button colored style={{fontSize:"20px",width: '20%', maxWidth: '400px', margin: 'auto'}} type="submit">Log Out</Button>
                    </span>
    
    
                </CardTitle>
    
                <div>
                {this.renderTransactions()}
                </div>
            </Card>

                      </Cell>
                  </Grid>
              </div>

            </Content>

                
            </Layout>
            </div>
          )
        }
        else{
        return(
        <div>Please Wait...</div>
        )
        }
    }
}

export default Admin;
