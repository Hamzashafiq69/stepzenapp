import { View, Text,  SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState} from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import { TabStackParamList } from '../navigator/TabNavigator';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import { RootStackParamList } from '../navigator/RootNavigator';
import { Input, Image } from '@rneui/themed';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS, GET_ORDERS } from '../grapgql/queries';
import CustomerCard from '../components/CustomerCard';

export type CustomerScreenNavigationProps = CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, "Customers">,
NativeStackNavigationProp<RootStackParamList>
>


const CustomerScreen = () => {

    const tw = useTailwind();
    const navigation = useNavigation();
   const [input, setInput] = useState<string>("");
   const {loading, error, data} = useQuery(GET_ORDERS)

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown : false,
      });
    }, []);
  
  
    return (
    <ScrollView style={{backgroundColor:"#59C1CC"}}>
      <Image
      source={{ uri: "https://links.papareact.com/3jc"}}
     containerStyle={tw("w-full h-64")}
      PlaceholderContent={<ActivityIndicator/>}
      />
      <Input placeholder="Search by Customer" value={input} onChangeText={setInput}
      containerStyle={tw("bg-white pt-5 pb-0 px-10 ")}/>
    
    {data?.getCustomers?.filter((customer: CustomerList)=>customer.value.name.includes(input))
    .map(({name: ID, value: {email, name}}: CustomerResponse)=>{

      <CustomerCard key={ID} email={email} name={name} userId={ID}/>
    }
    
    )}
    
    
    
    </ScrollView>
  )
}

export default CustomerScreen