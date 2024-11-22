import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';


export type RootStackParamList = {
    ContactDetail: { contactId: number };
    ContactList: undefined;
    Login: { email: string, password: string};
    Register: undefined;
  };
  
export type ContactListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,  'ContactList'>;

export type ContactDetailScreenRouteProp = RouteProp<RootStackParamList, 'ContactDetail'>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export type LoginScreenRoutenProp = RouteProp<RootStackParamList, 'Login'>;

export type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;
