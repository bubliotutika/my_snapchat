import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Body, Navbar } from '../../layout';
import { Slider, Button, Icon } from 'react-native-elements';
import { ImagePicker, Permissions, SecureStore } from 'expo';
import axios from "axios";

export default class Send extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userToken: null,
            cameraAllow: false,
            sliderValue: 1,
            sendUser: [],
            sendTo: null,
            imageUri: null,
        };
        this.takePic.bind(this);
        this.sendSnap.bind(this);
    }

    async componentDidMount() {
        const userToken = await SecureStore.getItemAsync('userToken');
        this.setState({ userToken });
    }

    async handleTakePic() {
        if (!this.state.cameraAllow) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            if (status === "granted")
                this.setState({ cameraAllow: true });
        }

        if (this.state.cameraAllow)
            this.takePic();
    }
    
    async takePic() {
        const opts = {
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            exif: true,
        };
        const img = await ImagePicker.launchCameraAsync(opts);
        if (!img.cancelled) {
            this.setState({ imageUri: img.uri });
        }
    }

    async sendSnap() {
        const { imageUri, sliderValue, userToken } = this.state;
        const sendTo = await SecureStore.getItemAsync('sendTo');
        if (sendTo && imageUri) {
            const filename = imageUri.split('/').pop();
            const formdata = new FormData();
            formdata.append('duration', sliderValue);
            formdata.append('to', sendTo);
            formdata.append('image', { 
                uri: imageUri, 
                name: filename, 
                type: `images/${filename.split('.')[1]}`
            });

            axios.post("http://10.34.5.254/api/snap", formdata, {
                headers: { token: userToken }
            }).then(res => {
                SecureStore.deleteItemAsync('sendTo');
                this.setState({
                    sliderValue: 1,
                    sendTo: null,
                    imageUri: null,
                });
            })
            .catch(err => console.log(err));
        }
    }

    handleSendTo() {
        this.props.navigation.navigate('UserList', { 
            navigation: this.props.navigation,
            userToken: this.state.userToken, 
            sliderValue: this.state.sliderValue,
            imageUri: this.state.imageUri,
        });
    }

    render() {
        return (
            <Container>
                <Body>
                    <View style={{marginTop: "15%"}}></View>
                    <View style={styles.sliderContainer}>
                        <View style={{width: "100%", alignItems: "center"}}>
                            <Text>Duration: {this.state.sliderValue}s</Text>
                        </View>
                        <Slider
                            thumbTintColor="#fbc531"
                            step={1}
                            minimumValue={1}
                            maximumValue={60}
                            value={this.state.sliderValue}
                            onValueChange={sliderValue => this.setState({ sliderValue })}
                        />
                    </View>
                    <View style={styles.sendToContainer}>
                        <Button
                            raised
                            buttonStyle={styles.imgPickBtn}
                            titleStyle={styles.imgPickText}
                            type="outline"
                            title="Take a pic"
                            icon={
                                <Icon
                                    containerStyle={{width:"20%"}}
                                    name='camera-retro'
                                    type='font-awesome'
                                    size={24}
                                    color='#e84118'
                                />
                            }
                            onPress={this.handleTakePic.bind(this)}
                        />
                    </View>
                    <View style={styles.sendToContainer}>
                        <Button
                            raised
                            buttonStyle={styles.imgPickBtn}
                            titleStyle={styles.imgPickText}
                            type="outline"
                            title="To"
                            icon={
                                <Icon
                                    containerStyle={{width:"20%"}}
                                    name='user-o'
                                    type='font-awesome'
                                    size={24}
                                    color='#e84118'
                                />
                            }
                            onPress={this.handleSendTo.bind(this)}
                        />
                    </View>
                    <View style={styles.sendToContainer}>
                        <Button
                            raised
                            buttonStyle={styles.imgPickBtn}
                            titleStyle={styles.imgPickText}
                            type="outline"
                            title="Snap"
                            icon={
                                <Icon
                                    containerStyle={{width:"20%"}}
                                    name='share'
                                    type='font-awesome'
                                    size={24}
                                    color='#fbc531'
                                />
                            }
                            onPress={this.sendSnap.bind(this)}
                        />
                    </View>
                    </Body>
                <Navbar  navigation={this.props.navigation}/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        marginBottom: "5%",
        width: "100%",
        height: "20%",
        alignItems: 'center',
    },

    titleText: {
        marginTop: "5%",
        marginBottom: "5%",
        fontSize: 30,
        color: "#1e272e",
    },

    sliderContainer: {
        width: "80%",
    },

    sendToContainer: {
        height: "10%",
        marginTop: "5%",
        alignItems: 'center',
        width: "80%",
    },

    imgPickBtn: {
        width: "100%",
        borderRadius: 0,
        borderWidth: 1,
        borderColor: "transparent",
        borderLeftColor: "transparent",
        backgroundColor: "#1e272e",
    },

    imgPickText: {
        width: "80%",
        color: "#fff",
    }
});