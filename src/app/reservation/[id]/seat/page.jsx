    "use client";
    import axios from "axios";
    import cookie from "js-cookie";
    import { useEffect, useState } from "react";
    import { useRouter, useSearchParams } from "next/navigation";
    import queryString from "query-string";
import { Button } from "react-bootstrap";

    export default function Seat(props){
        const [data, setData]=useState(null);
        const [selectedSeats, setSelectedSeats] = useState([]);
        const [selectedSeatsId, setSelectedSeatsId] = useState([]);
        const router = useRouter();
        const param = useSearchParams();
        const quantity = param.get("quantity");
        const type = param.get("type");
        const seatNum = param.get("num");
        const [count, setCount] = useState(parseInt(quantity));

        useEffect(() => {
            const seatFetch = async () => {
                try {
                    const res = await axios.get(`http://localhost:8080/seat/${props.params.id}`);
                    setData(res.data);
                    console.log(res.data);
                    if (res.data.length === 0) {
                        console.log("실행");
                        for (let i = 0; i < 20; i++) {
                            await axios.post(`http://localhost:8080/seat/save`, {
                                flightId: props.params.id,
                                username: "temp",
                                buyTime: "",
                                airLine: cookie.get("airLine"),
                                depTime: cookie.get("depTime"),
                                arrTime: cookie.get("arrTime"),
                                depCity: cookie.get("depcity"),
                                arrCity: cookie.get("arrcity"),
                                payPrice: cookie.get("price"),
                                isRes: "false",
                                tmpRes: "false",
                                email: null
                            });
                        }
                        window.location.reload();
                    } else {
                        console.log("존재하는 비행편 db");
                    }
                } catch (error) {
                    console.error("Error fetching seat data:", error);
                }
            }
        
            seatFetch();
        }, []);

        function handleBack(){
            router.push("")
        }

        function handleReservation(i, id){
            if(isSeatSelected(i)==true){
                console.log(selectedSeatsId);
                console.log(selectedSeats);
                const index = selectedSeats.indexOf(i);
                selectedSeats.splice(index, 1);
                const index2 = selectedSeatsId.indexOf(id);
                selectedSeatsId.splice(index2, 1);
                
                console.log(selectedSeatsId);
                console.log(selectedSeats);
                
                setCount(count+1);
                return;
            }

            if (count > 0) {
                setSelectedSeats([...selectedSeats, i]);
                setCount(count-1);
                setSelectedSeatsId([...selectedSeatsId, id]);
            }
            else{
                alert(quantity+"자리만 선택해주세요");
                return;
            }
            
            console.log(count);
            console.log(quantity);
        }

        function isSeatSelected(seatIndex) {
            return selectedSeats.includes(seatIndex);
        }

        async function handleSubmit(){
            if(count!==0){
                alert("좌석을 전부 선택해주세요");
                return;
            }
            for(let seatId of selectedSeatsId){
                await axios.get(`http://localhost:8080/find/${seatId}`)
                .then(res=>{
                    if(res.data===1){
                        alert("이미 예약중인 좌석입니다.");
                        window.location.reload();
                    }
                })
            }
            for(let seatId of selectedSeatsId){
                await axios.put(`http://localhost:8080/seat/tmpReservation/${seatId}`,{
                    tmpRes: "true"
                })
                await axios.get(`http://localhost:8080/tmpRes/${seatId}`);
            }
            //const encodedFruits = selectedSeatsId.map((id) => encodeURIComponent('selectedSeatsId[]') + '=' + encodeURIComponent(id)).join('&');
            const query = "?"+queryString.stringify({ selectedSeatsId }) + "&quantity=" + quantity;
            
            router.push('./seat/finalRes'+query);
        }
        
        return( //.filter을 사용하여 왼쪽 오른쪽 중앙의 좌석을 따로따로 배치
        <>
            <div className="seatPage"> 
                <div className="seatWrapper">
                    {data&&data.filter((seat, index)=>(index<3)).map((seat, index)=>(
                        <button key={seat.num} className={isSeatSelected(index)||(seat.tmpRes==="true"||seat.isRes==="true")?"selectedSeat":"seat"} onClick={()=>handleReservation(index, seat.num)} 
                        disabled={(seat.tmpRes==="true"||seat.isRes==="true")||type==="1"}>{(seat.tmpRes==="true"||seat.isRes==="true")&&seat.num!=seatNum?"예약":"a-"+seat.num%20}</button>
            ))}
                    <div></div>
                    {data&&data.filter((seat, index)=>(index<7&&index>2)).map((seat, index)=>(
                        <button key={seat.num} className={isSeatSelected(index+3)||(seat.tmpRes==="true"||seat.isRes==="true")?"selectedSeat":"seat"} onClick={()=>handleReservation(index+3, seat.num)} 
                        disabled={(seat.tmpRes==="true"||seat.isRes==="true")||type==="1"}>{(seat.tmpRes==="true"||seat.isRes==="true")&&seat.num!=seatNum?"예약":"a-"+seat.num%20}</button>
            ))}
                    <div></div>
                    {data&&data.filter((seat, index)=>(index<10&&index>6)).map((seat, index)=>(
                        <button key={seat.num} className={isSeatSelected(index+7)||(seat.tmpRes==="true"||seat.isRes==="true")?"selectedSeat":"seat"} onClick={()=>handleReservation(index+7, seat.num)} 
                        disabled={(seat.tmpRes==="true"||seat.isRes==="true")||type==="1"}>{(seat.tmpRes==="true"||seat.isRes==="true")&&seat.num!=seatNum?"예약":"a-"+seat.num%20}</button>
            ))}
                </div>
                <div className="seatWrapper">
                    {data&&data.filter((seat, index)=>(index<=12&&index>=10)).map((seat, index)=>(
                        <button key={seat.num} className={isSeatSelected(index+10)||(seat.tmpRes==="true"||seat.isRes==="true")?"selectedSeat":"seat"} onClick={()=>handleReservation(index+10, seat.num)} 
                        disabled={(seat.tmpRes==="true"||seat.isRes==="true")||type==="1"}>{(seat.tmpRes==="true"||seat.isRes==="true")&&seat.num!=seatNum?"예약":"b-"+seat.num%10}</button>
            ))}
                    <div></div>
                    {data&&data.filter((seat, index)=>(index<17&&index>12)).map((seat, index)=>(
                        <button key={seat.num} className={isSeatSelected(index+13)||(seat.tmpRes==="true"||seat.isRes==="true")?"selectedSeat":"seat"} onClick={()=>handleReservation(index+13, seat.num)} 
                        disabled={(seat.tmpRes==="true"||seat.isRes==="true")||type==="1"}>{(seat.tmpRes==="true"||seat.isRes==="true")&&seat.num!=seatNum?"예약":"b-"+seat.num%10}</button>
            ))}
                    <div></div>
                    {data&&data.filter((seat, index)=>(index<20&&index>16)).map((seat, index)=>(
                        <button key={seat.num} className={isSeatSelected(index+17)||(seat.tmpRes==="true"||seat.isRes==="true")?"selectedSeat":"seat"} onClick={()=>handleReservation(index+17, seat.num)} 
                        disabled={(seat.tmpRes==="true"||seat.isRes==="true")||type==="1"}>{(seat.tmpRes==="true"||seat.isRes==="true")&&seat.num!=seatNum?"예약":"b-"+((seat.num-1)%10+1)}</button>
            ))}
                </div>
            </div>
            <div className="btnWrapper">
                {type!=="1"?
                    (<Button onClick={handleSubmit} variant="primary">좌석 선택</Button>):
                    (<></>)
                }
            </div>      
        </>
        )
    }