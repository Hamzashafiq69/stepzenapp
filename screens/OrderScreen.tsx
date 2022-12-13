import { StyleSheet, Text, View } from 'react-native'
import React,{useLayoutEffect} from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { Card, Icon } from '@rneui/themed';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import DeliveryCard from '../components/DeliveryCard';



export type OrdersScreenNavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabStackParamList,"Orders">, NativeStackNavigationProp<RootStackParamList>
>;

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">

const OrderScreen = () => {
    const tw = useTailwind();
       const navigation = useNavigation<OrdersScreenNavigationProp>();
const {

    params: {order},
}= useRoute<OrderScreenRouteProp>();

useLayoutEffect(() => {
  
  navigation.setOptions({
    headerTitle: order.trackingItems.customer.name,
    headerTitleStyle:{color: "black"},
    headerBackTitle: "Deliveries",
    headerTintColor: "#EB6A7C"
  })
}, [order]);




  return (
    <View style={tw("-mt-2")}>
    <DeliveryCard order={order} fullWidth/>
    </View>
  )
}

export default OrderScreen

