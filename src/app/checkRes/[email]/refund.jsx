"use client";
import axios from "axios";
import { Button } from "react-bootstrap"
export default function Refund({num}){
    async function handleRefund(){
        if(window.confirm("정말 환불하시겠습니까?")){
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
            <Button variant="danger" onClick={handleRefund}>환불</Button>{' '}
        </>
    )
}