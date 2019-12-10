import React from 'react';
import { AsyncStorage } from 'react-native';
import * as Font from 'expo-font';

import AppNavigation from './App/Navigation/AppNavigation';

const STORAGE_KEY = 'MOOD'

console.disableYellowBox = true;

export default class App extends React.Component {
    state = {
        fontLoaded: false,
    };


    async componentDidMount() {
        await Font.loadAsync({
            'icomoon': require('./assets/fonts/icomoon.ttf'),
            'Lato-Black': require('./assets/fonts/Lato-Black.ttf'),
            'Lato-BlackItalic': require('./assets/fonts/Lato-BlackItalic.ttf'),
            'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
            'Lato-BoldItalic': require('./assets/fonts/Lato-BoldItalic.ttf'),
            'Lato-Italic': require('./assets/fonts/Lato-Italic.ttf'),
            'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
            'Lato-LightItalic': require('./assets/fonts/Lato-LightItalic.ttf'),
            'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
            'Lato-Thin': require('./assets/fonts/Lato-Thin.ttf'),
            'Lato-ThinItalic': require('./assets/fonts/Lato-ThinItalic.ttf'),
        });
        this.setState({ fontLoaded: true });
    }

    render() {
        if (this.state.fontLoaded) {
            return <AppNavigation />
        }
        return null;
    }
}
