import React from 'react'
import { Typography , Button } from 'antd'

const {Title , Paragraph} = Typography // DeStructuring
const Hero = () => {
  return (
    <main>
      <div className="container">
        <div className="row">
            <div className="col ">
                <Title level={1}>Hero</Title>
                <Paragraph>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque tenetur laudantium, dolores exercitationem vero eum. Laborum vitae facere, rem quasi, asperiores earum, eaque perferendis reiciendis ipsum consequuntur non exercitationem vel!</Paragraph>
                <div className='text-center' ><Button type='primary'>Click Me</Button></div>
            </div>
        </div>
      </div>
    </main>
  )
}

export default Hero
