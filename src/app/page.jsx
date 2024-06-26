"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Link from "next/link";
import {getLoginState} from "./hook";

export default function Home(){
    const router = useRouter();
    const arrCityRef = useRef();
    const depCityRef = useRef();
    const dateRef = useRef();
    const quaRef = useRef();
    const [quantity, setQuantity] = useState(1);
    const [isLogin, setIsLogin] = useState(getLoginState());
    const today = new Date().toISOString().slice(0,10);

    function searchCity() {
        router.push(`/flightList?depCity=${depCityRef.current.value.trim()}&arrCity=${arrCityRef.current.value.trim()}&date=${dateRef.current.value.replace(/-/g, "")}&quantity=${quantity}`);
    }
    
    return (
        <div className="home">
            <div className="search">
                <div className="searchWrapper">
                    <div>
                        <select ref={depCityRef}>
                            <option value="서울">서울</option>
                            <option value="제주">제주</option>
                            <option value="부산">부산</option>
                            <option value="광주">광주</option>
                        </select>
                    </div>
                    {/* <input type="text" ref={depCityRef} id="searchCity" placeholder="출발지를 입력하세요"/> */}
                    
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqWtdvm-RKOtIG1uq5_Ix9abcbvrRRaQFVn-rXFjnnXg&s" id="planeIcon"/>
                    
                    <div>
                        <select ref={arrCityRef}>
                            <option value="제주">제주</option>
                            <option value="서울">서울</option>
                            <option value="부산">부산</option>
                            <option value="광주">광주</option>
                        </select>
                    </div>
                    {/* <input type="text" ref={arrCityRef} id="searchCity" placeholder="도착지를 입력하세요"/> */}
                    <div>
                        <input type="date" id="searchDate" max="2077-06-20" min={today} ref={dateRef} defaultValue={today}/>
                    </div>
                    <div>
                        <Button onClick={()=>setQuantity(quantity-1)}>-</Button>
                    </div>
                    <div>
                        <span>{quantity}명</span>
                    </div>
                    <div>
                        <Button onClick={()=>setQuantity(quantity+1)}>+</Button>
                    </div>
                    <div>
                        <Button onClick={searchCity} variant="primary">검색</Button>{' '}
                    </div>
                </div>
            </div>
        </div>
    );
}