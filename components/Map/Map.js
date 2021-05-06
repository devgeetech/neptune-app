import {useEffect, useState} from "react"
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
// import DataHydrator from '../utils/dataHydrator'
import { useQuery, gql } from "@apollo/client";

import Spinner from '../UI/Spinner/Spinner'
import {geocodes} from '../utils/geoCoding'

// import {  iconSOS  } from './Icons';

const QUERY = gql`
  query getCurrentEvents{
    current_event {
      _id
      event_type
      location_frequency
      locations
    }
    help_tweets(query: {status: "1"}) {
        location
        status
        timestamp
        tweet
    }
  }
`;

const purpleOptions = { color: 'purple' }

const Map = () => {

    const { data } = useQuery(QUERY);
    const [geoCenter, updGeoCenter] = useState([9.299283023092007, 76.61524601418083])

    useEffect(() => {
        if(data){
            if(data.current_event.locations.length>=1){
                updGeoCenter(geocodes[data.current_event.locations[0]])
            }
        }
    }, [data])

    if(data){
        console.log(data)
        console.log(geoCenter)
    }

    const Markers = data ? 
        data.current_event.locations.length>=1 ?
            data.current_event.locations.map((locName, locIndex) => {
                if(geocodes[locName]) {
                    return(
                        <FeatureGroup pathOptions={purpleOptions} key={locIndex}>
                            <Circle center={geocodes[locName]} radius={data.current_event.location_frequency[locIndex] * 2000} />
                            {/* <Marker 
                                position={geocodes[locName]}
                                draggable={false}
                                animate={true}
                            >
                            </Marker> */}
                            <Popup>
                                <div>
                                    <div>
                                        <strong>Location:</strong> {locName}
                                    </div>
                                    <div>
                                        <strong>Type:</strong> {data.current_event.event_type ? data.current_event.event_type : "N/A"}
                                    </div>
                                    <div>
                                        <strong>Severity:</strong> {data.current_event.location_frequency[locIndex]}
                                    </div>
                                </div>
                            </Popup>
                        </FeatureGroup>
                    )
                } else {
                    return []
                }
            }) 
                : [] : []
       
    const helpMarkers = data ? 
        data.help_tweets.length>0 ?
            data.help_tweets.map((helpObj, helpIndex) => {
                if(geocodes[helpObj.location]) {
                    return(
                        <FeatureGroup key={helpIndex}>
                            <Marker 
                                position={geocodes[helpObj.location]}
                                draggable={false}
                                animate={true}
                                // icon={iconSOS}
                            >
                                <Popup>
                                    <div>
                                        <div>
                                            <strong>Tweet:</strong> {helpObj.tweet}
                                        </div>
                                        <div>
                                            <strong>Time:</strong> {helpObj.timestamp}
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        </FeatureGroup>
                    )
                } else {
                    return []
                }
            }) 
                : [] : []            

    const MapComp =()=> (
        <MapContainer center={geoCenter} zoom={7} scrollWheelZoom={false} style={{height: "100%", width: "100%"}}>
            <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
            {Markers.map(el => {
                return el
            })}
            {helpMarkers.map(el => {
                return el
            })}
        </MapContainer>
    )

    return (
        <>
            {data ? <MapComp /> : <Spinner /> }
        </>
    )
}

export default Map