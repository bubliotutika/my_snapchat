import React from 'react';
import { View, ScrollView, StyleSheet, } from 'react-native';
import { ListItem, Icon, SearchBar } from 'react-native-elements';
import { Container, Body } from '../../layout';
import { SecureStore } from 'expo';
import Loading from './loading/index';
import axios from 'axios';

const FAKE_USER = [
    { email: "User-1" },
    { email: "User-2" },
    { email: "User-3" },
    { email: "fake-1" },
    { email: "fake-2" },
    { email: "fake-3" },
];

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            isReady: true,
            users: [...FAKE_USER],
            foundUsers: [...FAKE_USER],
            userToken: this.navigation.state.params.userToken,
            searchText: "",
        };
        // this.getUsers();
    }

    getUsers() {
        axios.get("http://10.34.5.254/api/user/all", {
            headers: { token: this.state.userToken }
        })
        .then(res => {
            this.setState({ 
                users: res.data.data,
                isReady: true,
            });
        })
        .catch(err => console.log(err))
    }

    handleUserClick = async (email, navigation) => {
        await SecureStore.setItemAsync('sendTo', email)
        navigation.navigate('Send');
    }

    handleSearchBar(searchText) {
        const { users } = this.state;
        const foundUsers = [{ email: "No user found" }];
        if (searchText.length > 0) {
            this.setState({ isReady: false })
            foundUsers.pop();
            for (let i = 0; i < users.length; ++i) {
                if (users[i].email.toLowerCase().includes(searchText.toLowerCase()))
                    foundUsers.push(users[i]);
            }
        }
        this.setState({ searchText, foundUsers, isReady: true });
    }

    render() {
        const { isReady, foundUsers, searchText } = this.state;

        if (!isReady) {
            return (
                <Container>
                    <Body>
                        <Loading />
                    </Body>
                </Container>
            );
        }

        return (
            <Container>
                <Body>
                    <View style={styles.searchBar}>
                        <SearchBar 
                            placeholder="Search..."
                            value={searchText}
                            onChangeText={this.handleSearchBar.bind(this)}
                            containerStyle={styles.containerStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            inputStyle={styles.inputStyle}
                            lightTheme={true}
                        />
                    </View>
                    <ScrollView style={{width: "100%"}} 
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.listContainer}>
                            {
                                foundUsers.map((user, key) => (
                                    <View style={styles.listItemContainer} key={key}>
                                        <ListItem
                                            containerStyle={styles.listItem}
                                            title={user.email}
                                            leftIcon={
                                                <Icon
                                                    name='user'
                                                    type='font-awesome'
                                                    color='#0984e3'
                                                />
                                            }
                                            onPress={(e => this.handleUserClick(user.email, this.navigation))}
                                        />
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>
                </Body>
            </Container>
        );
    }
}

const listItemBorderColor = "#ced6e0";

const styles = StyleSheet.create({
    searchBar: {
        width: "100%",
        height: "12%",
        margin: 0,
        padding: 0,
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

    containerStyle: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
    },

    inputContainerStyle: {
        width: "100%",
        backgroundColor: "#fff",
    },

    inputStyle: {
        width: "100%",
    },
});