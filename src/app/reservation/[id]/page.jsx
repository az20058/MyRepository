"use client";
import { useEffect, useState } from "react";
import { getLoginState } from "../../hook"
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { useRouter } from "next/navigation";
import cookie from 'js-cookie';
import { useSearchParams } from "next/navigation";

export default function Reservation(props){
    const router = useRouter();
    const param = useSearchParams();
    const quantity = param.get("quantity");
    const [formDataArray, setFormDataArray] = useState([]);
    //let formDataArray=[];

    //console.log(formDataArray);
    useEffect(()=>{
      const initialFormDataArray = [];
      for (let i = 0; i < quantity; i++) {
        initialFormDataArray.push({
          firstName: "",
          lastName: "",
          birthDate: "",
          gender: "",
          email1: "",
          email2: "",
          nationality: "",
        });
      }
      setFormDataArray(initialFormDataArray);
    },[quantity])

    function renderFlightItems(count) {
      const items = [];
      for (let i = 0; i < count; i++) {
        items.push(
        <div key={i}>     
        <label>예약자 {i+1}</label>
        
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>First name</Form.Label>
          <Form.Control type="text" 
          name="firstName"
          onChange={(e) => handleInputChange(e, i)}
          placeholder="이름(영문)" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Last name</Form.Label>
          <Form.Control  type="text"
                        placeholder="성(영문)"
                        name="lastName"
                        onChange={(e) => handleInputChange(e, i)} />
        </Form.Group>
      </Row>

      <Form.Label>이메일</Form.Label>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Control type="text" 
          name="email1"
          onChange={(e) => handleInputChange(e, i)}
          placeholder="이메일 입력" />
        </Form.Group>
@
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Control  type="text"
                        placeholder="naver.com"
                        name="email2"
                        onChange={(e) => handleInputChange(e, i)} />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>생년월일</Form.Label>
          <Form.Control type="text"
                            placeholder="ex)19900802"
                            name="birthDate"
                            onChange={(e) => handleInputChange(e, i)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>성별</Form.Label>
          <Form.Select defaultValue="성별"
          name="gender"
          onChange={(e) => handleInputChange(e, i)}
          >
            <option value="">성별을 선택해주세요</option>
            <option value="man">남자</option>
            <option value="woman">여자</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>국적</Form.Label>
          <Form.Control type="text"
                            placeholder="국적을 입력하세요"
                            name="nationality"
                            onChange={(e) => handleInputChange(e, i)}/>
        </Form.Group>
      </Row>
    
    <hr/>
    </div>
        );
      }
      return items;
    }

    var formData = {
        firstName: "",
        lastName: "",
        birthDate: "",
        gender: "",
        email1: "",
        email2: "",
        nationality: "",
    }
    ; //쿠키에다가 저장하기!!!!!*******
    function handleInputChange(e, i){
        const {name, value} = e.target;

        formDataArray[i][name] = value;
    }

    function handleSubmit(e){
        e.preventDefault();
        for(let i=0;i<quantity;i++){
          if(formDataArray[i].firstName==""&&formDataArray[i].birthDate==""&&formDataArray[i].lastName==""&&formDataArray[i].gender==""&&formDataArray[i].nationality==""&&formDataArray[i].email==""){
            alert("빈 항목이 있습니다.");
            return;
          }
        }
        
        for(let j=0;j<quantity;j++){
          cookie.set('firstName'+j, formDataArray[j].firstName);
          cookie.set('lastName'+j, formDataArray[j].lastName);
          cookie.set('birth'+j, formDataArray[j].birthDate);
          cookie.set('nationality'+j, formDataArray[j].nationality);
          cookie.set('gender'+j, formDataArray[j].gender);
          cookie.set('email'+j, formDataArray[j].email1+"@"+formDataArray[j].email2);
          //console.log(formData);
          router.push(`/reservation/${props.params.id}/seat?quantity=${quantity}`)
        }
    }

    return (
      <div className="formWrapper">
        <Form onSubmit={handleSubmit}>
        {renderFlightItems(quantity)}
        <Button variant="primary" type="submit">
          Submit
        </Button>
        </Form>
      </div>
    )
}