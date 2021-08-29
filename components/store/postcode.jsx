import React, { useState } from 'react'
import DaumPostCode from 'react-daum-postcode'
import { Button, Modal } from 'semantic-ui-react'

const Postcode = (props) => {
  const [open, setOpen] = useState(false)

  const handleComplete = (data) => {
    let fullAddress = data.address
    let extraAddress = ''
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== ''
          ? `, ${data.buildingName}`
          : data.buildingName)
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '')
    }
    props.handleAddress(fullAddress, data.zonecode)
    setOpen(false)
  }

  return(
    <div>
      <Button onClick={
        (evt)=>{
          evt.preventDefault()
          setOpen(true)
        }
      }>
        {props.buttonLabel}
      </Button>
      <Modal open={open}
             onClose={()=> setOpen(false)}
             onOpen={()=> setOpen(true)}
      >
        <Modal.Header>가게 주소 찾기</Modal.Header>
        <Modal.Content>
          <DaumPostCode onComplete={handleComplete}
                        className="post-code"/>
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default Postcode
