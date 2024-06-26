"use client"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import {getLoginState} from "./hook";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import cookie from "js-cookie";
import { useRouter } from 'next/navigation';

export default function Homenav() {
  const [isLogin, setIsLogin] = useState(getLoginState());
  const pathName = usePathname();
  const [userName, setUserName] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);


    useEffect(()=>{
        setIsLogin(getLoginState());
    }, [pathName])

    useEffect(()=>{
      if(isLogin==="true"){
        setUserName(cookie.get("username"));
      }
    }, [isLogin])

    function logout() {
      cookie.set("isLogin", "false");
      cookie.remove("username");
      window.location.reload();
      router.push("/");
  }
  function viewReservation(){
    router.push(`/checkRes/${userName}?type=ID`);
  }
  function viewUserInfo(){
    router.push(`/userInfo`);
  }

  return (
    mounted&&
    <div className='header'>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className="title" href="/">My plane plan</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/checkRes">예약 확인</Nav.Link>
            {isLogin==="true"?
              <NavDropdown title={userName} id="nav-dropdown">
                <NavDropdown.Item onClick={viewUserInfo} eventKey="4.2">회원 정보</NavDropdown.Item>
                <NavDropdown.Item onClick={viewReservation} eventKey="4.3">예약 정보</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout} eventKey="4.4">로그 아웃</NavDropdown.Item>
              </NavDropdown>
            :
              <Nav.Link href="/login">로그인 / 회원가입</Nav.Link>
            }
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
