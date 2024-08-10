"use client";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function Pay({flightId, depTime, arrTime, date, airLine, prestigeCharge, economyCharge}){
    const router = useRouter();
    const param = useSearchParams();
    const quantity = param.get("quantity");
    const [isLogin,setIsLogin] = useState(null);
    
    //console.log(flightId);
    function processPay(){
        cookie.set("date",date);
        cookie.set("depTime", depTime);
        cookie.set("arrTime", arrTime);
        cookie.set("depcity", param.get("depCity"));
        cookie.set("arrcity", param.get("arrCity"));
        cookie.set("airLine", airLine);
        if(isLogin==="true"){
            if(prestigeCharge){
              cookie.set("price", prestigeCharge*0.9);
            }
            else{
              cookie.set("price", economyCharge*0.9);
            }
          }
          else{
            if(prestigeCharge){
              cookie.set("price", prestigeCharge);
            }
            else{
              cookie.set("price", economyCharge);
            }
          }
        router.push(`/reservation/${date+flightId.toString()}?quantity=${quantity}`);
    }

    useEffect(()=>{
        setIsLogin(cookie.get("isLogin"));
    })
    
    return (
        <>
            <button onClick={processPay} className="main_search" variant="primary">예약</button>{' '}
        </>
    )
    }