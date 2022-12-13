import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { Card, Divider, Icon } from '@rneui/themed'
import OrdersScreen from '../screens/OrdersScreen'
import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle'
import MapView,{Marker} from 'react-native-maps';






type Props ={
  order: Order
  fullWidth?: Boolean
}
const DeliveryCard = ({order, fullWidth}: Props) => {
    const tw= useTailwind();
  return (
    <Card containerStyle={[tw(`${fullWidth ? "rounded-none m-0" : "rounded-lg"} my-2 `),{
        
        backgroundColor: fullWidth ? "#EB6A7C" : "#59C1CC",
        padding:0,
        paddingTop: 16,
        shadowColor: "black",
        shadowOffset: {width:0,height:2},
        shadowOpacity:0.2,
        shadowRadius:4,
    },]}>
<View style={fullWidth && {height: "100%"}}>
<Icon
      style={tw("mb-5 ml-auto")}
      name="box"
type='entypo'
color="white"
size={50}


      />
    <View style={tw("items-start p-5 -mt-3")}>
        <View style={tw("mx-auto")}>


      <Text style={tw(" text-xs text-center uppercase text-white font-bold  ")}>
        {order.carrier} - {order.trackingId}
      </Text >
      <Text style={tw(" text-lg text-center text-white font-bold  ")}>Expected Delivery:{new Date(order.createdAt).toLocaleDateString()}</Text>
      <Divider color='white'/>
    
        </View>
    <View style={tw("mx-auto pb-5")}>
        <Text style={tw("mt-5 text-center text-base text-white font-bold")}>Address</Text>
        <Text style={tw("text-center text-sm text-white")}>{order.Address},{order.City}</Text>
        <Text style={tw("text-center italic text-sm text-white")}>Shipping Cost: RS{order.shippingCost}</Text>
    </View>
    
    </View>
    <Divider color="white"/>
   
<View style={tw("p-5")}>
{order.trackingItems.items.map((item)=>(
    <View key={item.item_id} style={tw("flex-row justify-between items-center")}>
        <Text style={tw("text-sm italic text-white")}>{item.name}</Text>
        <Text style={tw("text-white text-xl")}>x {item.quantity}</Text>
    </View>


    ))}
    </View>
    <MapView initialRegion={{latitude: order.Lat,
    longitude: order.Lng,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,

}}
style={[tw("w-full"),{flexGrow: 1},!fullWidth && {height:200}]}
>
<Marker
coordinate={{
    latitude: order.Lat,
    longitude: order.Lng,
}}
title="Delivery Location"
description='{order.Address' 
identifier='destination'/>


</MapView>
</View>
    </Card>
  )
}

export default DeliveryCard

const styles = StyleSheet.create({})