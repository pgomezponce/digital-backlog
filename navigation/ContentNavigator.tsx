import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Layout } from '@ui-kitten/components'

import { database } from "firebase/app";
import { Text } from 'react-native';

export class ContentNavigator extends Component {

    async asyncSetBacklog(){

        let data = await database().ref(this.props.userUID + '/reminders').once('value').then(function(snapshot) {
            let ans = snapshot.val();

            
            return ans;
        });
        console.log(data);
        
        this.setState({...this.state, backlog: data});
    }

    constructor(props) {
        super(props);
        this.asyncSetBacklog();    
        this.state = {backlog: []}
    }


    render() {
        console.log(this.state);
        
        return (
            <Layout style={{backgroundColor:'#EF6969', width:'100%', height:'100%', alignContent:'center', justifyContent:'center'}}>
                <Card>
                    <Text>{this.state.backlog.pushed_value ?  this.state.backlog.pushed_value.title : ''}</Text>
                </Card>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => ({
    userUID: state.user.userInfo.uid,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentNavigator)
