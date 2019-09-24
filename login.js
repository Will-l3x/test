import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {
    Link
  } from "react-router-dom";
//import {PostData} from './Auth/PostData';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';
// import "./login.css";

class Login extends Component{
    constructor (props){

       super(props);

       this.state={
           email:null,
           password:null,
           loggedIn:false,
           token:null
       };
       
       this.handleChange=this.handleChange.bind(this);
       this.submit=this.submit.bind(this);
    }

    componentWillMount(){
        if(window.token){
            this.setState({
                loggedIn:true
            })
        }
    }

    handleChange(event){
        console.log(event.target.value);
        let name=event.target.name;
        let value=event.target.value;
            console.log(name,value)
            let data={};
            data[name]=value;

            this.setState(data);
    }

    render(){

        // if(this.state.loggedIn){
           
        //     return <Redirect to="/Home" />
        // }

        return(
            <div className={'ms_content_wrapper padder_top10'}><br />
                <div className="modal-content">
                    <div className={'modal-body'}>
                        <div className="ms_register_img">
                                <img src="images/register_img.png" alt="" className="img-fluid" />
                        </div>
                        <div className="ms_register_form col-md-2"></div>
                        <div className="ms_register_form col-md-4">
                            <form onSubmit={this.submit} className={'modal-body'}>
                            <div className={'ms_heading'}>
                                <h1 style={{color: 'gold'}}> Please login</h1>
                            </div>
                            <div className="form-group">    
                                <FormGroup controlId="email"  bsSize="large" className={'form-group'} >
                                    Email
                                    <input
                                    name={'email'}
                                    className={'form-control'}
                                    autoFocus
                                    value={this.state.email}
                                    type="email"
                                    //value={this.state.email}
                                    onChange={this.handleChange}
                                    />
                                   
                                </FormGroup>
                            </div>
                            <div className="form-group">    
                                <FormGroup controlId="password" bsSize="large" className={'form-group'}>
                                    Password
                                    <input
                                    name={'password'}
                                    className={'form-control'}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    type="password"
                                    placeholder={'*****************************'}
                                    />
                                    
                                </FormGroup><br />
                            </div>
                                <Button
                                    className={'form-control btn-danger'}
                                    block
                                    bsSize="large"
                                    onClick={this.login}
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </form><br/>
                            <Link to="/register" style={{color: 'white'}}>Don't have an account? <br /> Click here to get <i>Registered</i></Link>
                        </div>    
                    </div>
                </div>
            </div>
        );
    }
    submit(e){ 
        this.setState({loggedIn:true})
        e.preventDefault();

        window.axios.post('http://strimai.azurewebsites.net/api/login',{email:this.state.email,password:this.state.password,
        })
        .then(response=>{
            console.log('response');
            localStorage.setItem('token',response.data.token)
            const token = localStorage.getItem('token')
            console.log(token);
            if(token === response.data.token){
                alert(this.state.email + '\n' + response.data.message);
                window.location.href = '/Home';
            }else{
                alert(this.state.email + '\n' + response.data.message);
                alert('Please try again');
                window.location.href = '/login';
            }
            this.setState({loggedIn:true});
            
           
        });
    }
}

export default Login;