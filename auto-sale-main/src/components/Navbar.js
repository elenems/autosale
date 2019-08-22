import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logoutUser} from '../redux/actions/userActions'
class Navbar extends Component {

    logoutUser = () => {
      this.props.logoutUser();
    }

    render() {
        const {isLogged} = this.props;
        let links = '';
        if(isLogged){
           links = <React.Fragment>
               <button onClick = {this.logoutUser} className='waves-effect waves-light btn space-left'>Logout</button>
               <Link to='/profile'><button className='waves-effect waves-light btn space-left'>Profile</button></Link>
               </React.Fragment>
        }else{
          links = <React.Fragment>
             <Link to='/signup'><button className='waves-effect waves-light btn space-left'>Signup</button></Link>
             <Link to='/login'><button className='waves-effect waves-light btn space-left'>Login</button></Link>
          </React.Fragment>
        }
        return (
                <div className='row valign-wrapper'>
                    <div className='col s4 xl7 left left-align'>
                    <Link className='logo' to='/'>Auto<span>Sale</span></Link>
                    </div>
                    <div className='col s8 xl5 right right-align'>
                       {links}
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.user.isLogged
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
