"use client"
import cookie from "js-cookie"
import { useEffect, useState } from "react";

export default function Price({economyCharge, prestigeCharge}){
    const [isLogin,setIsLogin] = useState(null);

    useEffect(()=>{
        setIsLogin(cookie.get("isLogin"));
    })

    return (
        <div className="price">
          {isLogin === "true" ? (
            prestigeCharge ? (
              <div>
                <div>
                  <span id="xprice">{prestigeCharge}</span>
                  <span>{prestigeCharge * 0.9}원</span>
                </div>
              </div>
            ) : (
              <div>
                <span id="xprice">{economyCharge}</span>
                <span>{economyCharge * 0.9}원</span>
              </div>
            )
          ) : (
            <div>
              {prestigeCharge ? (
                <div>
                  <div>{prestigeCharge} 원</div>
                </div>
              ) : (
                <span>{economyCharge} 원</span>
              )}
            </div>
          )}
        </div>
      );
      
}