import React from 'react';
import { View } from 'react-native';
import styles from '../../../styles';
import { Input, Icon, Button, Text } from 'react-native-elements';
import axios from 'axios';

export default class Form extends React.Component {
    state = {
        email: null,
        password: null,
        passwordConfirm: null,
    }

    async handleSubmit() {
        if (this.state.email !== "" && this.state.password !== "" && this.state.passwordConfirm !== "") {
            if(this.state.password && this.state.passwordConfirm) {
                await axios.post("http://10.34.5.254/api/register", {
                    email: this.state.email,
                    password: this.state.password,
                })
                .then(async (res) => {
                    this.setState({
                        email: "",
                        password: "",
                        passwordConfirm: "",
                    })
                })
                .catch((error) => {});
            }
        } else {
            console.log('empty field')
        }
    }

    render() {
        return (
            <View style={ styles.containerForm }>
            <View style={{height: "3%"}}/>
            <View style={ styles.containerInput }>
                <Input
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholder='Email'
                    leftIcon={
                        <Icon
                            raised
                            name='envelope'
                            type='font-awesome'
                            size={24}
                            color='#363636'
                        />
                    }
                    value={this.state.email}
                    onChangeText={email => this.setState({email})}
                />
            </View>
            <View style={ styles.containerInput }>
                <Input
                    keyboardType="default"
                    textContentType="password"
                    secureTextEntry
                    placeholder='Password'
                    leftIcon={
                        <Icon
                            raised
                            name='key'
                            type='font-awesome'
                            size={24}
                            color='#363636'
                        />
                    }
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}
                />
            </View>
            <View style={ styles.containerInput }>
                <Input
                    keyboardType="default"
                    textContentType="password"
                    secureTextEntry
                    placeholder='Confirm password'
                    leftIcon={
                        <Icon
                            raised
                            name='key'
                            type='font-awesome'
                            size={24}
                            color='#363636'
                        />
                    }
                    value={this.state.passwordConfirm}
                    onChangeText={passwordConfirm => this.setState({passwordConfirm})}
                />
            </View>
            <View style={ styles.containerSubmit }>
                <Button
                    buttonStyle={{ height: 50 }}
                    titleStyle={styles.textColor}
                    raised
                    type="clear"
                    title="Register"
                    onPress={this.handleSubmit.bind(this)}
                />
            </View>
        </View>
        );
    }
}