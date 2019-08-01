import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class Loading extends React.Component {
    render() {
        return (
            <View style={{ marginTop: "60%", width: "100%", height: "100%" }}>
                <Icon
                    name='hourglass'
                    type='font-awesome'
                    size={50}
                    color='#363636'
                />
            </View>
        );
    }
}