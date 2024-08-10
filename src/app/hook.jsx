"use client";

import cookie from "js-cookie";

export function getLoginState(){
    // if (typeof window !== 'undefined') {
    //     return window.localStorage.getItem("isLogin");
    // }
    //   return null;
    return cookie.get("isLogin");
}