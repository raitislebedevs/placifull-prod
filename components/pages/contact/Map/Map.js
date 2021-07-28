import { withTranslation } from 'i18n'
import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('components/common/LeafletMap'), {
  ssr: false
})

const Map = (props) => {
  const { t } = props

  const markers = [
    {
      position: { lat: 56.946285, lng: 24.105078 + 0.1 },
      popUp: <p>Some description</p>
    },
    {
      position: { lat: 56.946285, lng: 24.105078 - 0.1 },
      popUp: <p>Some description</p>
    },
    {
      position: { lat: 56.946285 + 0.1, lng: 24.105078 },
      popUp: <p>Some description</p>
    }
  ]
  return (
    <div className='contact-container__map'>
      <LeafletMap
        currentCenter={{ lat: 56.946285, lng: 24.105078 }}
        zoom={10}
        markers={markers}
      >
      </LeafletMap>
    </div>
  )
}

export default Map