import { StyleSheet, Text, View, } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useQuery } from '@apollo/client'
import { GET_ORDERS } from '../grapgql/queries'

const useOrders = () => {
  
  const {loading, error, data} = useQuery(GET_ORDERS)
    const [orders, setOrders] = useState<Order[]>([])
  
  useEffect(()=>{
    if(!data) return;
    const orders: Order[]= data.getOrders.map(({value}: OrderResponse)=>({
carrier: value.carrier,
    createdAt: value.createdAt,
    shippingCost: value.shippingCost,
    trackingId: value.trackingId,
    Address: value.Address,
    trackingItems: value.trackingItems,
    City: value.City,
    Lat: value.Lat,
    Lng: value.Lng,

    }));
  },[data]);

  return {loading, error,orders};
}

export default useOrders

