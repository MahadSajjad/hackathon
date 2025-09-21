import React from 'react'
import { Typography } from 'antd'

const {Title, Paragraph} = Typography // DeStructuring
const Services = () => {
  return (
    <main>
      <div className="container">
        <div className="row">
            <div className="col ">
                <Title level={1}>Services</Title>
                <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, enim ab. Officiis illum accusantium ut sunt nihil tempora sed commodi rem quibusdam, perspiciatis laudantium doloremque voluptates ex ipsum maxime? Vel.</Paragraph>
            </div>
        </div>
      </div>
    </main>
  )
}

export default Services
