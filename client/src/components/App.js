import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loadAccounts, saveAccounts } from '../actions/accounts';
import { Link } from 'react-router-dom';

import './account.css'

class App extends Component {

    componentDidMount() {
        this.props.loadAccounts();
    }

    render(){
        const {accounts} = this.props.accounts;

        return  (
            <div>
                <div>
                    <h3 id='addBtn'><Link to='/add'>+ Add</Link></h3>
                </div>
                {
                   
                    accounts && accounts.length === 0 ? (
                        <div>
                            <h3>No Accounts.</h3>
                        </div>
                    ) : 
                    (
                        <div>
                            Portfolio View Goes Here.
                        </div>
                    )
                }

            </div>
            
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadAccounts: () => dispatch(loadAccounts()),
        saveAccounts: (accounts) => () => dispatch(saveAccounts(accounts))
    }
}

const mapStateToProps = (state) => {
    const { accounts } = state;
    return { accounts: accounts }
}
const componentConnector = connect(mapStateToProps, mapDispatchToProps);
export default componentConnector(App);