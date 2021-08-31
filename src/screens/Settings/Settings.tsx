import React from 'react'
import { View, Text } from 'react-native'
import RNSchedule from 'rnschedule';

const data = [
    {
      title: 'Lunch Appointment',
      subtitle: 'With Harry',
      start: new Date(2020, 11, 2, 13, 0),
      end: new Date(2020, 11, 2, 14, 0),
      color: 'dodgerblue',
    }
  ]

const Settings = () => {
    return (
        <View style={{backgroundColor:'white',flex:1,padding:4}}>
        <RNSchedule
        dataArray={data}
        onEventPress={(appt:any) => console.log(appt)}
        
      />
      </View>
    )
}

export default Settings
