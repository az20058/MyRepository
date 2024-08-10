"use client";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap"
export default function CheckSeat({num, number, data}){
    const router = useRouter();
    let seats=[];
    data.map((item)=>{
        seats.push(item.num);
    });
    console.log(seats);
    async function handleCheckSeat(){
        router.push(`/reservation/${num}/seat?type=1&num=${number}&seats=${seats}`);
    }
    
    return(
        <>
            <button className="main_search" onClick={handleCheckSeat}>좌석 확인</button>{' '}
        </>
    )
}