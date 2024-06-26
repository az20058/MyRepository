"use client";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, Row, Form, Col } from "react-bootstrap";

export default function UserInfo(){
  const router = useRouter();
    const [userData, setUserData] = useState([]);
    const [formData, setFormData] = useState({
        birth: "",
        email: "",
        phone: "",
        password: "",
        password2: ""
    });
    const emailRef = useRef();
    const pwRef = useRef();
    const birthRef = useRef();
    const phoneRef = useRef();
    async function handleModify(){
        if(formData.password!==formData.password2){
            alert("입력한 비밀번호가 일치하지 않습니다.");
            return;
        }
        if(formData.password){
          await axios.put(`http://localhost:8080/modifyUser/${cookie.get("username")}`, {
            password: pwRef.current.value,
            email: emailRef.current.value,
            birth: birthRef.current.value,
            phone: phoneRef.current.value
          })
        }
        else{
          await axios.put(`http://localhost:8080/modifyUser/${cookie.get("username")}`, {
            email: emailRef.current.value,
            birth: birthRef.current.value,
            phone: phoneRef.current.value
          })
        }
        alert("회원정보가 변경되었습니다.");
        window.location.reload();
    }

    async function handleRetire(){
      if(window.confirm("정말 탈퇴하시겠습니까?")){
        await axios.delete(`http://localhost:8080/userDelete/${userData.username}`)
          .then(res=>{
            alert("정상적으로 탈퇴 처리 되었습니다.");
          })
          .finally(()=>{
            cookie.set("isLogin", "false");
            cookie.remove("username");
            router.push('/');
          })
      }
    }

    function handleInputChange(e){
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    useEffect(()=>{
        const a = async ()=>{
            await axios.get(`http://localhost:8080/find/login/${cookie.get("username")}`)
            .then(res=>{
                setUserData(res.data);
            })
        }
        a();
    }, []);
    
    return (
        <div className="userInfo">
            <div className="infoWrapper">
            <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>ID</Form.Label>
          <p>{userData.username}</p>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" ref={pwRef}
          name="password"
          onChange={handleInputChange}
          placeholder="새 비밀번호를 입력하세요" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>비밀번호 재입력</Form.Label>
          <Form.Control type="password" 
          name="password2"
          onChange={handleInputChange}
          placeholder="한 번 더 입력하세요" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="text" ref={emailRef}
          name="email"
          onChange={handleInputChange}
          defaultValue={userData.email} />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>휴대전화</Form.Label>
          <Form.Control type="text" ref={phoneRef}
          name="phone"
          onChange={handleInputChange}
          defaultValue={userData.phone} />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>생년월일</Form.Label>
          <Form.Control type="text" ref={birthRef}
          name="birth"
          onChange={handleInputChange}
          defaultValue={userData.birth} />
        </Form.Group>
      </Row>
                <Button onClick={handleModify} variant="success">수정</Button>{' '}
                <Button onClick={handleRetire} variant="danger">탈퇴</Button>{' '}             
            </div>
        </div>
    )
}