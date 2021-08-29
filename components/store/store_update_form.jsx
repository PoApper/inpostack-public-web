import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Form, Grid, Icon, Message } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import axios from 'axios'

import Postcode from './postcode'
import styled from 'styled-components'

const StoreUpdateForm = () => {
  const router = useRouter()

  const [store_meta, setStoreMeta] = useState({ store_type: {} })
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [store_type, setStoreType] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [zipcode, setZipCode] = useState(0)
  const [description, setDescription] = useState('')
  const [open_time, setOpenTime] = useState('')
  const [close_time, setCloseTime] = useState('')

  useEffect(async () => {
    try {
      const res = await axios(`${process.env.NEXT_PUBLIC_API}/store/owner`,
        { withCredentials: true })
      const store = res.data
      setName(store.name)
      setPhone(store.phone)
      setAddress1(store.address1)
      setAddress2(store.address2)
      setZipCode(store.zipcode)
      setStoreType(store.store_type)
      setDescription(store.description)
      setOpenTime(store.open_time)
      setCloseTime(store.close_time)

      const res_store_meta = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/store/meta`)
      setStoreMeta(res_store_meta.data)
    } catch (err) {
      alert('점주 계정으로 로그인 해주세요!')
      router.push('/login')
    }
  }, [])

  async function handleUpdate (e) {
    e.preventDefault()

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API}/store/owner`, {
        phone: phone,
        store_type: store_type,
        description: description,
        address1: address1,
        address2: address2,
        zipcode: zipcode,
        open_time: open_time,
        close_time: close_time,
      }, { withCredentials: true })
      alert('가게 정보를 수정했습니다.')
      router.reload(window.location.pathname)
    } catch (err) {
      alert('가게 정보 수정에 실패했습니다.')
      console.log(err.message)
    }
  }

  const storeTypeOptions = Object.entries(store_meta.store_type).map(type => {
    const [key, value] = type
    return {
      key: key,
      text: value,
      value: value,
    }
  })

  return (
    <Form onSubmit={handleUpdate}>
      <Grid columns={2}>
        <Grid.Column width={10}>
          <>
            <Form.Input
              disabled
              label={'가게 상호'}
              value={name}
            />
            <Message color={'yellow'}>
              상호명을 수정하고 싶다면, 인포스택 관리팀에 연락해주세요! 📞
            </Message>

          </>

          <Form.Input
            label={'전화번호'}
            placeholder="010-0000-0000"
            value={phone}
            onChange={(e) => {
              if (e.target.value.length >= 14) return
              console.log('sldkfnsldkfnsd', e.target.value)
              console.log('sldkfnsldkfnsd', e.target)
              setPhone(e.target.value)
            }}/>

          <Form.Select
            label={'가게 분류'}
            value={store_type}
            options={storeTypeOptions}
            onChange={(e, data) => setStoreType(data.value)}
          />

          <Form.Field>
            <label>가게 주소</label>
            <Postcode
              buttonLabel="주소 찾기"
              handleAddress={(addr1, zipcode) => {
                setZipCode(zipcode)
                setAddress1(addr1)
                setAddress2('')
              }}
              zipcode={zipcode}
            />
            <Form.Input
              name="우편번호"
              value={zipcode}
              style={{ marginTop: '8px' }}
            />
            <Form.Input
              name="address1"
              value={address1}
            />
            <Form.Input
              name="address2"
              value={address2}
              onChange={(e, data) => setAddress2(data.value)}
            />
          </Form.Field>

          <Form.TextArea
            label={'가게 소개'}
            value={description}
            onChange={(e, data) => setDescription(data.value)}
          />

          <Form.Group style={{ width: '100%', margin: '0 0 14px 0' }}>
            <div className={'required field'}
                 style={{ width: '100%', paddingLeft: 0 }}>
              <label>시작 시간</label>
              <DatePicker
                showTimeSelect showTimeSelectOnly timeIntervals={30}
                name="open_time" dateFormat="hh:mm aa"
                value={open_time}
                onKeyDown={e => e.preventDefault()}
                onChange={open_time => {
                  setOpenTime(
                    `${open_time.getHours()}:${open_time.getMinutes() === 0 ? '00' : '30'}`,
                  )
                }}
              />
            </div>
            <div className={'required field'}
                 style={{ width: '100%', paddingRight: 0 }}>
              <label>종료 시간</label>
              <DatePicker
                showTimeSelect showTimeSelectOnly timeIntervals={30}
                name="close_time" dateFormat="hh:mm aa"
                value={close_time}
                onKeyDown={e => e.preventDefault()}
                onChange={close_time => {
                  setCloseTime(
                    `${close_time.getHours()}:${close_time.getMinutes() === 0 ? '00' : '30'}`)
                }}
              />
            </div>
          </Form.Group>

          <Message>
            🔸 가게 정보 수정은 ‘저장’ 버튼을 누르면 완료됩니다.<br/>
            🔹 인포스택 개발팀은 잘못 기입된 정보로 인한 책임을 지지 않습니다.<br/>
            🔸 사장님께서는 꼭 다시 한번 확인 부탁드립니다.<br/>
            🔹 수정된 정보는 InPoStack 사이트에서 바로 확인이 가능합니다.
          </Message>

          <Form.Button>
            <Icon name="save" style={{ marginRight: '0.5rem' }}/>
            저장
          </Form.Button>
        </Grid.Column>
        <Grid.Column width={4}>
          <Form.Field>
            <label>가게 대표 사진</label>
            <ImgBox>
              <img style={{ borderRadius: '70%' }} width={200} height={200}
                   src="https://via.placeholder.com/200?text=InPostack"
                   alt="store_photo"/>
            </ImgBox>
            <FileBox>
              <label>업로드</label>
              <Form.Input type="file" accept="image/*" name="store_image"/>
            </FileBox>
            <p>가게를 대표하는 로고나 이미지를 업로드 해주세요.</p>
          </Form.Field>
        </Grid.Column>
      </Grid>
    </Form>
  )

}

const ImgBox = styled.div`
  margin-top: 15px;
  position: relative;
`

const FileBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  margin-top: -30px;

  label {
    z-index: 1;

    display: inline-block;
    padding: .5em .75em;
    line-height: normal;
    vertical-align: middle;

    cursor: pointer;
    font-size: inherit;

    border: 1px solid #ebebeb;
    border-bottom-color: #e2e2e2;
    border-radius: .5em;

    color: #fff;
    background-color: #6e757c;

  }

  input[type="file"] { //hidden tag
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`
export default StoreUpdateForm