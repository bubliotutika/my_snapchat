import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container, Body, Navbar } from '../../layout';
import { ListItem, Icon } from 'react-native-elements';
import { SecureStore } from 'expo';
import Loading from './loading/index';
import axios from 'axios';

const FAKE_SNAPS = [
    {
        duration: 10,
        from: "fake snap 1",
        snap_id: 1,
        image: "https://i.pinimg.com/originals/57/80/0e/57800e6fd63b49c51c106bc26bbc3933.jpg",
    },
    {
        duration: 10,
        from: "fake snap 2",
        snap_id: 2,
        image: "https://i.pinimg.com/originals/57/80/0e/57800e6fd63b49c51c106bc26bbc3933.jpg",
    },
    {
        duration: 10,
        from: "fake snap 3",
        snap_id: 3,
        image: "https://i.pinimg.com/originals/57/80/0e/57800e6fd63b49c51c106bc26bbc3933.jpg",
    },
    {
        duration: 10,
        from: "fake snap 4",
        snap_id: 4,
        image: "https://i.pinimg.com/originals/57/80/0e/57800e6fd63b49c51c106bc26bbc3933.jpg",
    },
    {
        duration: 10,
        from: "fake snap 5",
        snap_id: 5,
        image: "https://i.pinimg.com/originals/57/80/0e/57800e6fd63b49c51c106bc26bbc3933.jpg",
    },
];

export default class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            snaps: [...FAKE_SNAPS],
            isReady: false,
        }
        this.updateSnaps = this.updateSnaps.bind(this);
        this.getSnaps = this.getSnaps.bind(this);
    }

    handleItemClick = (snap) => {
        if (snap.duration !== 0 && snap.snap_id !== 0) {
            // snap.image = `http://10.34.5.254/api/snap/${snap.snap_id}`;
            this.props.navigation.navigate('Snap', { snap, userToken: this.state.userToken });
        }
    }

    componentDidMount = async() => {
        const userToken = await SecureStore.getItemAsync('userToken');
        this.setState({ userToken, isReady: true });
        // this.getSnaps();
        // this.updateSnaps();
    }

    getSnaps() {
        axios.get("http://10.34.5.254/api/snaps", {
            headers: { token: this.state.userToken }
        })
        .then(res => {
            if (res.data.data.length > 0)
                this.setState({ 
                    snaps: res.data.data,
                    isReady: true,
                 });
            else
                this.setState({ 
                    snaps: [{
                        duration: 0,
                        from: "No new snap",
                        snap_id: 0,
                        image: null,
                    }],
                    isReady: true,
                });
        })
        .catch(err => console.log(err))
    }

    updateSnaps() {
        setInterval(this.getSnaps, 10000);
    }

    render() {
        const { snaps, isReady } = this.state;

        if (!isReady) {
            return (
                <Container>
                    <Body>
                        <Loading />
                    </Body>
                    <Navbar />
                </Container>
            );
        }

        return (
            <Container>
                <Body>
                    <ScrollView style={{width: "100%"}} 
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.listContainer}>
                            {
                                this.state.snaps.map((snap, key) => (
                                    <View style={styles.listItemContainer} key={snap.snap_id}>
                                        <ListItem
                                            containerStyle={styles.listItem}
                                            title={snap.from}
                                            leftIcon={
                                                <Icon
                                                    name='image'
                                                    type='font-awesome'
                                                    color='#e84118'
                                                />
                                            }
                                            onPress={(e => this.handleItemClick(snap))}
                                        />
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>
                </Body>
                <Navbar navigation={this.props.navigation}/>
            </Container>
        );
    }
}

const listItemBorderColor = "#ced6e0";

const styles = StyleSheet.create({
    title: {
        marginBottom: "2.5%",
        width: "100%",
        height: "15%",
        alignItems: 'center',
    },

    titleText: {
        marginTop: "5%",
        marginBottom: "5%",
        fontSize: 30,
        color: "#1e272e",
    },

    listContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: listItemBorderColor,
    },

    listItemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: listItemBorderColor,
    },

    listItem: {
        paddingLeft: "10%",
        paddingRight: "10%",
    },
});