import React, { Component } from 'react';
import './css/style.css';

class GithubUser extends Component {
    constructor() {
        super();
        this.state = {
           data : {},
           isLoaded : false,
           username : '',
           showDefault : true,
           msg: "Please enter username"
        }
    }
    
    handleChange(e) {
        this.setState({username: e.target.value});
    }

    getUserInfo(e) {
        e.preventDefault();
        this.setState({showDefault: false, isLoaded: false});
        fetch('https://api.github.com/users/'+this.state.username)
          .then(response => response.json())
          .then((data) => {
              if (data.message) {
                  this.setState({data: {}, showDefault: true, isLoaded: true, username: '', msg: "User not found."});
              } else {
                  this.setState({data: data, isLoaded: true, username: ''});
              }
        });
    }

    componentDidMount() {
        document.title = "Github User Detail";
    }

    render() {
        return (
          <div className="container mt">
            <div className="row">
                <div className="mt col-md-4 col-sm-6 col-xs-12 np">
                    <div className="well">
                        <form onSubmit={this.getUserInfo.bind(this)}>
                            <input type="text" onChange={this.handleChange.bind(this)} 
                                value={this.state.username} name="username" 
                                required placeholder="Enter github username..." 
                                className="form-control" 
                                autoComplete="off"
                            />
                            <button type="submit" className="btn btn-success mt-sm">Get</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-sm-6 col-xs-12 np">
                    {(this.state.showDefault) ? <DefaultMsg msg={this.state.msg} /> : <GithubUserCard data={this.state.data} isLoaded={this.state.isLoaded} />}
                </div>
            </div>
          </div>
        );
    }
}

// component for showing msg
const DefaultMsg = (props) => (
    <div>
        <div className="alert alert-warning">{props.msg}</div>
    </div>
)

const GithubUserCard = (props) => (
    <div>
        {props.isLoaded ? <UserCard data={props.data} /> : <div className="loader"></div>}
    </div>
)

// markup for user deatil
const UserCard = (props) => (
    <div className="well card">
        <div className="user-img">
            <img src={props.data.avatar_url} />
        </div>
        <div className="mt">
            <a href={props.data.html_url} className="username" target="_blank">
                <h4>
                    <span className="fa fa-user"></span>
                    <span> {props.data.name} </span>
                    <span className="small"> ({props.data.login})</span>
                </h4>
            </a>
        </div>
        {
        (props.data.blog != "") ?
            <p>
                <span className="fa fa-link"></span>
                <a href={props.data.blog} ><span className="detail"> {props.data.blog}</span></a>
            </p>
            : ""
        }
        {
        (props.data.location != null) ?
            <p>
                <span className="fa fa-map-marker-alt"></span>
                <span className="detail"> {props.data.location}</span>
            </p>
            : ""
        }
        {
        (props.data.public_repos != null) ?
            <p>
                <span className="fa fa-folder"></span>
                <span className="detail">Repositories: {props.data.public_repos}</span>
            </p>
            : ""
        } 
        {
        (props.data.company != null) ?
            <p>
                <span className="fa fa-globe"></span>
                <span className="detail"> {props.data.company}</span>
            </p>
            : ""
        }   
        {
        (props.data.following != null) ?
            <p>
                <span className="fa fa-user-plus"></span>
                <span className="detail">Following: {props.data.following}</span>
            </p>
            : ""
        } 
        {
        (props.data.followers != null) ?
            <p>
                <span className="fa fa-user-tag"></span>
                <span className="detail">Followers: {props.data.followers}</span>
            </p>
            : ""
        }   
    </div>
)

export default GithubUser;