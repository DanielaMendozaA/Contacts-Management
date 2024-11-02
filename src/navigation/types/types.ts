import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';


export type RootStackParamList = {
    ContactDetail: { contactId: string };
    ContactList: undefined; 
  };
  
export type ContactListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,  'ContactList'>;

export type ContactDetailScreenRouteProp = RouteProp<RootStackParamList, 'ContactDetail'>;