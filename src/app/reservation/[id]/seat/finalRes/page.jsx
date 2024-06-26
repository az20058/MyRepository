"use client";
import { Button } from "react-bootstrap";
import axios from "axios";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FinalRes(props){
    const router = useRouter();
    const param = props.searchParams;
    const [depTime, setDepTime] = useState(null);
    const [arrTime, setArrTime] = useState(null);
    const [seatCode, setSeatCode] = useState(null);
    const [date, setDate] = useState(null);
    const [date2, setDate2] = useState(null);
    const [userName, setUserName] = useState(null);
    const [isLogin, setIsLogin] = useState(null);
    let seatNum;
    console.log(param.selectedSeatsId);
    const quantity = param.quantity;
    const [passengers, setPassengers] = useState([]);
    console.log(cookie.get("username"));
    const [currentTime, setCurrentTime] = useState('');
    console.log(currentTime);

    useEffect(() => {
        const now = new Date();
        const formattedTime = now.toLocaleString();
        setCurrentTime(formattedTime);
    }, []);


    useEffect(()=>{
        if(cookie.get("username")===(null||undefined)){
            setUserName("temp");
            console.log("dfadf");  
        }
        else{
            console.log("dfadf2");
            setUserName(cookie.get("username"));
        }
        console.log(userName);
    }, [])

    useEffect(()=>{
        setDepTime(cookie.get("depTime"));
        setArrTime(cookie.get("arrTime"));
        setIsLogin(cookie.get("isLogin"));

        const dateString = cookie.get("depTime");
        const year = dateString.slice(0, 4);
        const month = dateString.slice(4, 6);
        const day = dateString.slice(6, 8);
        const hours = dateString.slice(8, 10);
        const minutes = dateString.slice(10, 12);

        const dateString2 = cookie.get("arrTime");
        const year2 = dateString2.slice(0, 4);
        const month2 = dateString2.slice(4, 6);
        const day2 = dateString2.slice(6, 8);
        const hours2 = dateString2.slice(8, 10);
        const minutes2 = dateString2.slice(10, 12);
        let a;

        // 날짜 객체 생성
        setDate(year+"/"+month+"/"+day+" "+hours+"시 "+minutes+"분");
        setDate2(year2+"/"+month2+"/"+day2+" "+hours2+"시 "+minutes2+"분");

        
        const temp = [];
        for(let i=0;i<quantity;i++){
            if(quantity!=="1"){
                console.log(Math.trunc(((param.selectedSeatsId[i]-1)%20)/10));
                switch(Math.trunc(((param.selectedSeatsId[i]-1)%20)/10)){
                    case 0: seatNum="a"; break;
                    case 1: seatNum="b"; break;
                }
                if(seatNum==="b"){
                    a = {
                        num: param.selectedSeatsId[i],
                        birth: cookie.get("birth"+i),
                        name: cookie.get("firstName"+i)+" "+cookie.get("lastName"+i),
                        email: cookie.get("email"+i),
                        nationality: cookie.get("nationality"+i),
                        gender: cookie.get("gender"+i),
                        seatCode: seatNum+"-"+((param.selectedSeatsId[i]-1)%20-9)
                    }
                }else{
                    a = {
                        num: param.selectedSeatsId[i],
                        birth: cookie.get("birth"+i),
                        name: cookie.get("firstName"+i)+" "+cookie.get("lastName"+i),
                        email: cookie.get("email"+i),
                        nationality: cookie.get("nationality"+i),
                        gender: cookie.get("gender"+i),
                        seatCode: seatNum+"-"+((param.selectedSeatsId[i]-1)%20+1)
                    }
                }
                
                temp.push(a);
            }
            else{
                switch(Math.trunc(((param.selectedSeatsId-1)%20)/10)){
                    case 0: seatNum="a"; break;
                    case 1: seatNum="b"; break;
                }
                if(seatNum==="b"){
                    a = {
                        num: param.selectedSeatsId,
                        birth: cookie.get("birth"+i),
                        name: cookie.get("firstName"+i)+" "+cookie.get("lastName"+i),
                        email: cookie.get("email"+i),
                        nationality: cookie.get("nationality"+i),
                        gender: cookie.get("gender"+i),
                        seatCode: seatNum+"-"+((param.selectedSeatsId-1)%20-9)
                    }
                }
                else{
                    a = {
                        num: param.selectedSeatsId,
                        birth: cookie.get("birth"+i),
                        name: cookie.get("firstName"+i)+" "+cookie.get("lastName"+i),
                        email: cookie.get("email"+i),
                        nationality: cookie.get("nationality"+i),
                        gender: cookie.get("gender"+i),
                        seatCode: seatNum+"-"+((param.selectedSeatsId-1)%20+1)
                    }
                }
                temp.push(a);
            }
            
        }
        console.log(temp);
        console.log(isLogin);
        setPassengers(temp);
    },[])

    async function handleReservation(){
        let code;
        await axios.get('http://localhost:8080/getCode')
                .then(res=>{
                    code = res.data;
                })
        if(!Array.isArray(param.selectedSeatsId)){
            switch(Math.trunc(((param.selectedSeatsId-1)%20)/10)){
                case 0: seatNum="a"; break;
                case 1: seatNum="b"; break;
            }
            await axios.put(`http://localhost:8080/seat/reservation/${param.selectedSeatsId}`,{
                isRes: "true",
                username: userName,
                tmpRes: "false",
                buyTime: currentTime,
                email: cookie.get("email0"),
                seatCode: seatNum+"-"+((param.selectedSeatsId-1)%20+1),
                resKey: code
            })
            // await axios.post(`http://localhost:8080/send/${cookie.get("email0")}/${}`)
            // .then(()=>{
            //     console.log("sended email");
            // })
        }
        else{
            passengers.map(async (data, index)=>{
                await axios.put(`http://localhost:8080/seat/reservation/${data.num}`,{
                    isRes: "true",
                    username: userName,
                    tmpRes: "false",
                    buyTime: currentTime,
                    email: cookie.get("email"+index),
                    seatCode: data.seatCode,
                    resKey: code
                })
                // await axios.get(`http://localhost:8080/send/${data.email}`)
                // .then(()=>{
                //     console.log("sended email");
                // })
            })
        }

        alert("예약되었습니다.");
        // if(isLogin===(null||undefined)){
        //     Object.keys(cookie.get()).forEach(cookieName => {
        //         cookie.remove(cookieName);
        //       });
        // }
        router.push('/');
    }

    
    return(
        <>
            <div className="viewWrapper">
                {/* <h5>출발 : {date}</h5>
                <h5>도착 : {date2}</h5> */}
                <div className="fromToFinal">
                    <span>{date } {cookie.get("depcity")}</span>
                    <div className="arrow"></div>
                    <span>{date2 } {cookie.get("arrcity")}</span>
                </div>
                <div className="passengersWrapper">
                {passengers&&passengers.map((data, index)=>{
                    return(
                        <div key={index} className="passengers">
                            <p>탑승객 {index+1}</p>
                            <p>이름 : {data.name}</p>
                            <p>이메일 : {data.email}</p>
                            <p>국적 : {data.nationality}</p>
                            <p>생년월일 : {data.birth}</p>
                            <p>성별 : {data.gender}</p>
                            <p>좌석 : {data.seatCode}</p>
                        </div>
                    )
                })}
                </div>
                <div className="btnWrapper">
                    <Button onClick={handleReservation} variant="primary">예약 확정</Button>
                </div>
            </div>
        </>
    )
}