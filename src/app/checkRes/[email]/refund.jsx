"use client";
import axios from "axios";
import { Button } from "react-bootstrap"
export default function Refund({num, data}){
    async function handleRefund(){
        console.log(data);
        if(data.length>1){
            if(window.confirm("함께 예약한 모든 좌석을 환불하시겠습니까?")){
                data.map(async (item, index)=>{
                    await axios.put((`http://localhost:8080/refund/${item.num}`),{
                        buyTime: "",
                        isRes: "false",
                        username: "temp",
                        email: null,
                        resKey: null,
                    })
                    .then(res=>{
                        
                    })
                })
                alert("환불되었습니다.");
                window.location.reload();
            }
        }
        else if(window.confirm("정말 환불하시겠습니까?")){
            await axios.put((`http://localhost:8080/refund/${num}`),{
                buyTime: "",
                isRes: "false",
                username: "temp",
                email: null,
                resKey: null,
            })
            .then(res=>{
                alert("환불되었습니다.");
                window.location.reload();
            })
        }
    }
    
    return(
        <>
            <button className="refund_btn" onClick={handleRefund}>환불</button>{' '}
        </>
    )
}