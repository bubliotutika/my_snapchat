import React from 'react';
import { View, StyleSheet } from 'react-native';

export default (props) => {
    return (
        <View style={styles.containerHome}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    containerHome: {
        height: '100%',
        width: "100%",
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        margin: 0,
        padding: 0,
    },
});