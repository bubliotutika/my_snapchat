import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Container, Body } from '../../layout';
import Timer from './timer';
import axios from 'axios';

export default class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userToken: this.props.navigation.state.params.userToken,
            timer: this.props.navigation.state.params.snap.duration,
            snap: this.props.navigation.state.params.snap,
            isReady: false,
        }
        this.deleteSnap = this.deleteSnap.bind(this);
        this.timer;
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({ timer: this.state.timer - 1});
        }, 1000);
        this.deleteSnap();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    deleteSnap() {
        const { snap, userToken} = this.state;
        setTimeout(() => {
            // axios.post("http://10.34.5.254/api/seen", {
            //     id: snap['snap_id'],
            // },
            // {
            //     headers: { token: userToken }
            // })
            // .then(res => this.props.navigation.navigate('Box'))
            // .catch(err => console.log(err));
            this.props.navigation.navigate('Box');
        }, snap.duration * 1000);
    }

    render() {
        const { snap } = this.state;

        return (
            <Container>
                <Body>
                    <Timer timer={this.state.timer}/>
                    <View style={styles.imgBox}>
                        <Image
                            style={styles.image}
                            source={{uri: snap.image}}
                        />
                    </View>
                </Body>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    imgBox: {
        width: "90%",
        height: "90%",
        alignItems: 'center',
        marginTop: "5%",
        borderWidth: 1,
        borderColor: "#00000022",
    },

    image: {
        width: "100%",
        height: "100%",
    },
});