import React from "react"; 
import { Icon } from '@rneui/themed' ;

 import {
CompositeNavigationProp,
RouteProp,
useRoute,
useNavigation,
} from "@react-navigation/native"; 
 import { RootStackParamList } from "../navigator/RootNavigator"; 
 import { TabStackParamList} from "../navigator/TabNavigator"
import { BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp} from "@react-navigation/native-stack";
import { useTailwind } from "tailwind-rn/dist";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import useCustomerOrders from "../hooks/useCustomerOrders";
import DeliveryCard from "../components/DeliveryCard";

type ModalScreenNavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabStackParamList>, NativeStackNavigationProp<RootStackParamList, "MyModal">
>;
type ModalScreenRouteProp = RouteProp<RootStackParamList, "MyModal">



const ModalScreen= () => {

const tw = useTailwind();
const navigation = useNavigation<ModalScreenNavigationProp>();
const {
    params:{name, userId},
}= useRoute<ModalScreenRouteProp>();

const {loading, error, orders}= useCustomerOrders(userId);
return(
<View>
<TouchableOpacity
onPress={navigation.goBack}
style={tw("absolute right-5 top-5 z-10")} >
<Icon name="closecircle" type="antdesign" />
</TouchableOpacity>
<View style={{marginTop: 10}}>
<View style={[tw("py-5 borer-b"),{borderColor: "#59C1CC"}]} >
    <Text style={[tw("text-center text-xl font-bold"),{Color: "#59C1CC"}]}>{name}</Text>
    <Text style={tw("text-center text-sm italic")}>deliveries</Text>
</View>
</View>
<FlatList
contentContainerStyle={{paddingBottom: 200}}
data={orders}
keyExtractor={order=> order.trackingId}
renderItem={({item: order})=>
    <DeliveryCard order={order}/>
}


/>
</View>

)
}
export default ModalScreen;