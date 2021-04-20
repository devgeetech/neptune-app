import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

const Map = () => {
  return (
    <MapContainer center={[37.48694350289257, -120.42559057997666]} zoom={12} scrollWheelZoom={false} style={{height: "100%", width: "100%"}}>
      <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
      <Marker 
      position={[37.48694350289257, -120.42559057997666]}
      draggable={false}
      animate={true}
      >
        <Popup>
            <div>
                <div>
                    <strong>Location:</strong> California
                </div>
                <div>
                    <strong>Type:</strong> Earthquake
                </div>
                <div>
                    <strong>Severity:</strong> Low
                </div>
            </div>
        </Popup>
      </Marker>
      <Marker 
      position={[9.42054404175184, 76.93534063542627]}
      draggable={false}
      animate={true}
      >
        <Popup>
            <div>
                <div>
                    <strong>Location:</strong> Kanamala
                </div>
                <div>
                    <strong>Type:</strong> Flood
                </div>
                <div>
                    <strong>Severity:</strong> Low
                </div>
            </div>
        </Popup>
      </Marker>
      <Marker 
      position={[9.529231241859854, 76.97208160791118]}
      draggable={false}
      animate={true}
      >
        <Popup>
            <div>
                <div>
                    <strong>Location:</strong> Panchalimedu
                </div>
                <div>
                    <strong>Type:</strong> Landslide
                </div>
                <div>
                    <strong>Severity:</strong> High
                </div>
            </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map