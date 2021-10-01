import Layout from '../components/layout'
import styled from 'styled-components'
import { Button, Icon, Image, Label } from 'semantic-ui-react'
import { useState } from 'react'

const Open = () => {
  return <Label size='tiny' color='green' style={{borderRadius:'15px', marginLeft:'5px'}}>Open</Label>
}

const Closed = () => {
  return <Label size='tiny' color='red' style={{borderRadius:'15px', marginLeft:'5px'}}>Closed</Label>
}

const HaksikTime = (hour, min) => {
  var open = 0
  if(hour==7 || hour==11 || hour==17){
    if(min>=30){ open = 1 }
  }
  else if(hour==9 || hour==13){
    if(min<=30){ open = 1 }
  }
  else if(hour >7 && hour <9){ // hour==8
    open = 1
  }
  else if(hour>11 && hour <13) { // hour==12
    open = 1
  }
  else if(hour>17 && hour <19){ //hour==18
    open =1
  }
  if(open){
    return Open()
  }
  else {
    return <Label size='tiny' color='red' style={{borderRadius:'15px', marginLeft:'5px'}}>Closed</Label>
  }
}

const BurgerkingTime = (hour, min) => {
  var open = 0
  if(hour>=11 && hour<20){
    open = 1
  }
  else if(hour==20){
    if(min<=30){ open = 1 }
  }
  if(open){
    return Open()
  }
  else {
    return Closed()
  }
}

const BlueHillTime = (hour, min) => {
  var open = 0
  if(hour>=11 && hour<13){
    open = 1
  }
  else if(hour==13){
    if(min<=30){ open = 1 }
  }
  if(open){
    return <Label size='tiny' color='green'>Open</Label>
  }
  else {
    return <Label size='tiny' color='red'>Close</Label>
  }
}

const MatkkiTime = (hour, min) => {
  var open = 0
  if(hour>=11 && hour<13){
    open = 1
  }
  else if(hour==13){
    if(min<=30){ open = 1 }
  }
  if(open){
    return Open()
  }
  else {
    return Closed()
  }
}

const InPostech = () => {
  const date = new Date()
  const [hour, setHour] = useState(date.getHours())
  const [min, setMin] = useState(date.getMinutes())

  return (
    <Layout>
      <Location>지곡회관</Location>
      <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-around'}}>
        <Haksik>
        <div>
          <Subject>
            <h3>학생 정식</h3>
            {HaksikTime(hour, min)}
          </Subject>
        <h4>조식: 07:30 - 09:30</h4>
        <h4>중식: 11:30 - 13:30</h4>
        <h4>석식: 17:30 - 19:00</h4>
        <Button size='mini' style={{marginLeft: '20px', marginTop:'17px', borderRadius:'15px'}}><a href="https://dining.postech.ac.kr/"><Icon name='food'/>Menu</a></Button>
        </div>
        <Image src={'/in-postech/수저.svg'} size='tiny' style={{marginLeft: '80px'}}/>
      </Haksik>
      <GYD>
        <div>
          <Subject>
            <h3>그여든</h3>
            {HaksikTime(hour, min)}
          </Subject>
        <h4>조식: 07:30 - 09:30</h4>
        <h4>중식: 11:30 - 13:30</h4>
        <h4>석식: 17:30 - 19:00</h4>
        </div>
        <Image src={'/in-postech/접시.svg'} size='small' style={{marginLeft: '20px'}}/>
      </GYD>
      <Burgerking>
        <Subject>
          <h3>BURGER KING</h3>
          {BurgerkingTime(hour, min)}
        </Subject>
        <h4>영업시간: 11:00 - 20:30</h4>
        <Image src={'/in-postech/버거킹.svg'} size='small' style={{marginLeft: '160px'}}/>
      </Burgerking>
      </div>

      
      <Location>학생회관</Location>
      <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-around'}}>
      <Matkki>
        <Subject>
          <h3>마싰는 끼니</h3>
          {MatkkiTime(hour, min)}
        </Subject>
        <h4>영업시간: 11:00 - 13:30</h4>
        <Image src={'/in-postech/마싰는끼니.png'} size='small' style={{marginLeft: '160px', marginTop: '20px'}}/>
      </Matkki>
      <GYD>
        <div>
          <Subject>
            <h3>그여든 take out</h3>
            {HaksikTime(hour, min)}
          </Subject>
        <h4>11:30 - 13:30</h4>
        </div>
      </GYD>
      <Nearme>
        <div>
          <Subject>
            <h3>coffee near me</h3>
            {
              (hour>7 && hour <20) ?
              Open()
              :
              Closed()
            }
          </Subject>
        <h4>영업시간: 08:00 - 19:00</h4>
        </div>
      </Nearme>
      </div>

      <Location>국제관</Location>
      <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-around'}}>
      <BlueHill>
        <Subject>
          <h3>THE BLUE HILL</h3>
          {BlueHillTime(hour, min)}
        </Subject>
        <h4>영업시간: 11:00 - 13:30</h4>
        <Image src={'/in-postech/블루힐.svg'} size='small' style={{marginLeft: '160px', marginTop: '8px'}}/>
      </BlueHill>
      </div>
    </Layout>
  )
}

export default InPostech;

const Card = styled.div`
  width: 330px;
  height: 200px;
  margin: 10px;
  transition: all 200ms;
  border-radius: 12px;
  box-shadow: rgba(0,0,0,0.09) 4px 12px 30px 6px;
  &:hover {
    //transform: translateY(-5px);
    box-shadow: 3px 11px 28px 4px rgb(0 0 0 / 20%);
  }
  overflow: hidden;
  h4 {
    margin-left: 20px;
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 2px;
    padding: 0;
  }
`

const Location = styled.h2`
  margin-left: 15px;
  @media (max-width: 768px) { 
    margin-left: 17px;
  }
`

const Subject = styled.div`
  display: flex;
  padding-top: 20px;
  h3 {
    margin-left: 20px;
    margin-bottom: 0;
  }
  margin-bottom: 10px;
`

const BlueHill = styled(Card)`
  background-color: #4148c4;
`

const Haksik = styled(Card)`
  background-color: #A5B988;//64C0D7; // 5CBAD1;
  display: flex;
`

const GYD = styled(Card)`
  //background-color: #F7F5C2;
  //color: #000;
  display: flex;
`

const Burgerking = styled(Card)`
  background-color: #f3ebde;
`

const Matkki = styled(Card)`
  background-color: #FBE1A0;
`

const Nearme = styled(Card)`
  background-color: #BDB6A5; //#c9c8c4;
`