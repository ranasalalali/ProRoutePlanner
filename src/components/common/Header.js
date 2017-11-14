import React from 'react';
import { Text, View } from 'react-native';

// Make a Component

const Header = (props) => {
    const { textStyle, viewStyle } = styles;
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        paddingBottom:2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'

    },
    textStyle: {
        fontSize: 20
    }

};
// Make the Component available to other parts of the App
export { Header };
