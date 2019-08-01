import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { SecureStore } from 'expo';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    sendSnap() {
        this.props.navigation.navigate('Send');
    }

    logout() {
        SecureStore.deleteItemAsync('userToken');
        this.props.navigation.navigate('Auth');
    }

    snapBox() {
        this.props.navigation.navigate('Box');
    }

    render() {
        return (
            <View style={styles.navbar}>
                <View style={styles.navbarBtn}>
                    <Button
                        buttonStyle={styles.navbarText}
                        type="outline"
                        icon={
                            <Icon
                                name='account-box-multiple'
                                type='material-community'
                                size={26}
                                color={iconColorBox}
                            />
                        }
                        onPress={this.snapBox.bind(this)}
                    />
                </View>
                <View style={styles.navbarBtn}>
                    <Button
                        buttonStyle={styles.navbarText}
                        type="outline"
                        icon={
                            <Icon
                                name='camera-retro'
                                type='font-awesome'
                                size={24}
                                color={iconColorSnap}
                            />
                        }
                        onPress={this.sendSnap.bind(this)}
                    />
                </View>
                <View style={styles.navbarBtn}>
                    <Button
                        buttonStyle={styles.navbarText}
                        type="outline"
                        icon={
                            <Icon
                                name='md-exit'
                                type='ionicon'
                                size={27}
                                color={iconColorLogout}
                            />
                        }
                        onPress={this.logout.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

const iconColorBox = '#0984e3';
const iconColorSnap = '#6c5ce7';
const iconColorLogout = '#e84118';

const styles = StyleSheet.create({
    navbar: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        height: "11%",
        alignItems: 'center',
        backgroundColor: '#1e272e',
    },

    navbarBtn: {
        width: "33.3334%",
        height: '100%',
        padding: 0,
        flex: 1,
    },

    navbarText: {
        height: "100%",
        padding: 0,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: "transparent",
        borderLeftColor: "transparent"
    },
});