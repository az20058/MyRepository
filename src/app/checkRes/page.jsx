"use client";
import ComboBox from "../combobox";
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function CheckRes(){
    const router = useRouter();
    const options = ['naver.com', 'gmail.com', 'daum.net'];
    const [selectedFind, setSelectedFind] = useState("email");
    const [selectedOption, setSelectedOption] = useState(null);
    const emailRef = useRef(null);
    const IDRef = useRef(null);

    async function handleClickEmail(){
        const email = emailRef.current.value +"@"+ selectedOption;
        console.log(email);
        console.log()

        router.push(`/checkRes/${email}?type=email`);
    }

    function handleClickID(){
      const ID = IDRef.current.value;
      router.push(`/checkRes/${ID}?type=Code`);
    }

    function handleOptionSelect(option){
        setSelectedOption(option);
    }
        return (
          <div className="findFlight">  
            <div className="searchEmailWrapper">
              <div className="selectFindBy">
                <div className={`selectedFind${selectedFind === "email" ? "-active" : ""}`} onClick={()=>setSelectedFind("email")} style={selectedFind==="email"||!selectedFind?{backgroundColor:"#b0bec5"}:{backgroundColor:"white"}}>이메일로 찾기</div>
                <div className={`selectedFind${selectedFind === "email" ? "" : "-active"}`} onClick={()=>setSelectedFind("ID")} style={selectedFind==="email"||!selectedFind?{backgroundColor:"white"}:{backgroundColor:"#b0bec5"}}>예약코드로 찾기</div>
              </div>
              {selectedFind==="email"||!selectedFind?(
              <div className="findByText">
                <input type="text" className="combo-input" placeholder="이메일을 입력하세요" ref={emailRef}/> 
                <span className="emailMiddle">@</span> 
                <ComboBox options={options} onOptionSelect={handleOptionSelect}/>
                <button onClick={handleClickEmail} className="main_search">검색</button>{' '}
              </div>):(
              <div className="findByText">
                <input type="text" className="combo-input" placeholder="예약코드를 입력하세요" ref={IDRef}/> 
                <button onClick={handleClickID} className="main_search">검색</button>{' '}
              </div>)
              }
            </div>
          </div>
        );
      
}