import React from 'react';
import { View, StyleSheet } from 'react-native';

export default (props) => {
    return (
        <View style={styles.homeBody}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    homeBody: {
        alignItems: 'center',
        height: "89%",
        width: "100%",
        padding: 0,
    },
});