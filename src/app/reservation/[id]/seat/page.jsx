"use client";
import axios from "axios";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { Button } from "react-bootstrap";

export default function Seat(props) {
    const [data, setData] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedSeatsId, setSelectedSeatsId] = useState([]);
    const router = useRouter();
    const param = useSearchParams();
    const quantity = parseInt(param.get("quantity"));
    const type = param.get("type");
    const [seats, setSeats] = useState(null);
    const [count, setCount] = useState(quantity);

    useEffect(() => {
        if (type === "1") {
            setSeats(param.get("seats").split(','));
        } else {
            setSeats(['dummy']);
        }

        const seatFetch = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/seat/${props.params.id}`);
                setData(res.data);
                
                if (res.data.length === 0) {
                    for (let i = 0; i < 260; i++) { // 좌석 260개로 가정
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
                }
            } catch (error) {
                console.error("Error fetching seat data:", error);
            }
        };

        seatFetch();
    }, []);

    function handleBack() {
        router.push("");
    }

    function handleReservation(i, id) {
        if (isSeatSelected(i)) {
            const newSelectedSeats = selectedSeats.filter(seat => seat !== i);
            const newSelectedSeatsId = selectedSeatsId.filter(seatId => seatId !== id);

            setSelectedSeats(newSelectedSeats);
            setSelectedSeatsId(newSelectedSeatsId);
            setCount(prevCount => prevCount + 1);
        } else if (count > 0) {
            setSelectedSeats([...selectedSeats, i]);
            setSelectedSeatsId([...selectedSeatsId, id]);
            setCount(prevCount => prevCount - 1);
        } else {
            alert(`${quantity}자리만 선택해주세요`);
        }
    }

    function isSeatSelected(seatIndex) {
        return selectedSeats.includes(seatIndex);
    }

    async function handleSubmit() {
        if (count !== 0) {
            alert("좌석을 전부 선택해주세요");
            return;
        }

        for (let seatId of selectedSeatsId) {
            const res = await axios.get(`http://localhost:8080/find/${seatId}`);
            if (res.data === 1) {
                alert("이미 예약중인 좌석입니다.");
                window.location.reload();
                return;
            }
        }

        for (let seatId of selectedSeatsId) {
            await axios.put(`http://localhost:8080/seat/tmpReservation/${seatId}`, {
                tmpRes: "true"
            });
            await axios.get(`http://localhost:8080/tmpRes/${seatId}`);
        }

        const query = "?" + queryString.stringify({ selectedSeatsId }) + "&quantity=" + quantity;
        router.push('./seat/finalRes' + query);
    }

    const renderSeats = () => {
        if (!data) return null;

        const seatRows = [];
        const seatsPerLabel = 10; // 각 라벨당 좌석 수
        const alphabet = "abcdefghijklmnopqrstuvwxyz";

        for (let i = 0; i < data.length; i += seatsPerLabel) {
            const labelIndex = Math.floor(i / seatsPerLabel);
            const labelPrefix = alphabet[labelIndex] || alphabet[alphabet.length - 1]; // 라벨이 z 이후면 z로 고정
            const seatsRow = (
                <div className="seatWrapper" key={i}>
                    {data.slice(i, i + seatsPerLabel).map((seat, index) => {
                        const seatIndex = i + index;
                        const isSelected = isSeatSelected(seatIndex) || seats.includes(seat.num.toString());
                        const isReserved = seat.isRes === "true" || seat.tmpRes === "true";
                        const label = isReserved && !seats.some(num => num === seat.num.toString()) ? "예약" : `${labelPrefix}-${(seat.num - 1) % 10 + 1}`;

                        return (
                            <button
                                key={seat.num}
                                className={`seat ${isReserved ? "reserved" : ""} ${isSelected ? "selected" : ""}`}
                                onClick={() => handleReservation(seatIndex, seat.num)}
                                disabled={isReserved || type === "1"}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            );

            seatRows.push(seatsRow);
        }

        return seatRows;
    };

    return (
        <>
            <div className="seatPageWrapper">
                <div className="seatPage">
                    {renderSeats()}
                </div>
                <div className="btnWrapper">
                    {type !== "1" && (
                        <button onClick={handleSubmit} className="main_search">좌석 선택</button>
                    )}
                </div>
            </div>
        </>
    );
}
