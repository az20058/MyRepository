"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";

export default function Home(){
    const router = useRouter();
    const arrCityRef = useRef();
    const depCityRef = useRef();
    let view = "829,091,839,019";
    let nowView = "17189";
    const dateRef = useRef();
    const [quantity, setQuantity] = useState(1);
    const today = new Date().toISOString().slice(0,10);

    function searchCity() {
        router.push(`/flightList?depCity=${depCityRef.current.value.trim()}&arrCity=${arrCityRef.current.value.trim()}&date=${dateRef.current.value.replace(/-/g, "")}&quantity=${quantity}`);
    }

    function plusQuantity() {
        if(quantity===9)
            return;
        setQuantity(quantity+1);
    }

    function minusQuantity() {
        if(quantity===1)
            return;
        setQuantity(quantity-1);
    }
    
    return (
        <div className="home">
            <div className="search sm:w-[45vw] w-[100vw]">
                <div className="logo"></div>
                <div className="searchWrapper sm:w-full">
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
                        <Button onClick={minusQuantity}>-</Button>
                    </div>
                    <div>
                        <span>{quantity}명</span>
                    </div>
                    <div>
                        <Button onClick={plusQuantity}>+</Button>
                    </div>
                    <div>
                        <button className="main_search" onClick={searchCity} variant="primary">검색</button>{' '}
                    </div>
                </div>
                <div className="use">
                    <div className="inline">
                        <span>Total use  : </span>
                        <div className="accumulate">
                            <span className="acc_view">{view}</span>
                        </div>
                    </div>
                    <div className="inline">
                        <span>Today use : </span>
                        <div className="today">
                            <span className="acc_view">{nowView}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}