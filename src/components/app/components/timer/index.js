import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { timer } = this.props;
        return (
            <View style={styles.timerBox}>
                <Text style={styles.timer}>Delete in: { timer }s</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    timerBox: {
        height: "5.5%",
        alignItems: "center",
        alignContent: "center",
    },

    timer: {
        fontSize: 16,
        marginTop: "3.5%",
        width: "100%",
        height: "100%",
    },
});