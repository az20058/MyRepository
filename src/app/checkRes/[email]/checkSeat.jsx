"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap"
export default function Refund({num, number}){
    const router = useRouter();
    
    async function handleRefund(){
        router.push(`/reservation/${num}/seat?type=1&num=${number}`);
    }
    
    return(
        <>
            <Button variant="primary" onClick={handleRefund}>좌석 확인</Button>{' '}
        </>
    )
}