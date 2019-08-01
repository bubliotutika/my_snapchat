import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { LoginForm, RegisterForm } from '../components/auth/index';
import { Box, Send, Loading, Snap, UserList } from '../components/app/index';

const headerStyle = {
    borderTopColor: '#fff',
    borderTopWidth: 20,
    paddingBottom: 20,
    backgroundColor: '#1e272e',
    height: 70,
};
const headerTintColor = '#ffffff';

const AppNavigator = createStackNavigator({
    Box: {
        screen: Box,
        navigationOptions: {
            title: "My snap",
            headerStyle,
            headerTintColor,
        }
      
    },
    Send: {
        screen: Send,        
        navigationOptions: {
            title: "New snap",
            headerStyle,
            headerTintColor,
            headerLeft: null
        }
    },
    Snap: {
        screen: Snap,
        navigationOptions: {
            title: "Snap",
            headerStyle,
            headerTintColor,
            headerLeft: null,
        }
    },
    UserList: {
        screen: UserList,
        navigationOptions: {
            title: "Search User",
            headerStyle,
            headerTintColor,
        }
    },
});

const AuthNavigator = createStackNavigator({
    Login: {
        screen: LoginForm,
        navigationOptions: {
            title: "Sign In",
            headerStyle,
            headerTintColor,
        }
    },
    Register: {
        screen: RegisterForm,
        navigationOptions: {
            title: "Sign In",
            headerStyle,
            headerTintColor,
        }
    },
});

export default createAppContainer(createSwitchNavigator(
    {
        Loading,
        Auth: AuthNavigator,
        App: AppNavigator,
    },
    {
        initialRouteName: "Loading"
    }
));