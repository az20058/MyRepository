import axios from "axios";
import Refund from "./refund";
import CheckSeat from "./checkSeat";

export default async function Email(props) {
    const email = props.params.email;
    const param = props.searchParams;
    console.log(param.type);
    let res;
    let datas;
    switch(param.type){
        case "email":
            res = await axios.get(`http://localhost:8080/find/email/${email}`);
            datas = res.data;
            break;
        case "ID":
            res = await axios.get(`http://localhost:8080/find/ID/${email}`);
            datas = res.data;
            break;
        case "Code":
            res = await axios.get(`http://localhost:8080/find/code/${email}`);
            datas = res.data;
            break;
    }
    console.log(email);

    // 예약 코드로 데이터 그룹화
    const groupedData = datas.reduce((groups, data) => {
        const {resKey} = data;
        if (!groups[resKey]) {
            groups[resKey] = [];
        }
        groups[resKey].push(data);
        return groups;
    }, {});

    console.log(groupedData);

    return(
        <div>
            <div className="flightItem">
                            <div>구매 일시</div>
                            <div>좌석</div>
                            <div>항공사</div>
                            <div>출발</div>
                            <div></div>
                            <div>도착</div>
                            <div>가격</div>
                            <div>비고</div>
                        </div>
            {Object.keys(groupedData).length > 0 ? (
                Object.keys(groupedData).map(resKey => (
                    <div key={resKey}>
                        <div className="m2"></div>
                        {groupedData[resKey].map((data, index) => (
                            <div className="flightItem" key={index}>
                                <div>
                                    <div>{data.buyTime.slice(0, 11)}</div>
                                    <div>{data.buyTime.slice(-11, -3)}</div>
                                </div>
                                <div>
                                    <span>{data.seatCode}</span>
                                    <div><CheckSeat num={data.flightId} number={data.num} data={groupedData[resKey]}/></div>
                                </div>
                                <div>
                                    <span className="airLine">{data.airLine}</span>
                                </div>
                                <div>
                                    <div>{data.depCity}</div>
                                    <span>{data.depTime.toString().slice(-4, -2)}시 </span>
                                    <span>{data.depTime.toString().slice(-2)}분</span>
                                </div>
                                <div className="arrow"></div>
                                <div>
                                    <div>{data.arrCity}</div>
                                    <span>{data.arrTime.toString().slice(-4, -2)}시 </span>
                                    <span>{data.arrTime.toString().slice(-2)}분</span>
                                </div>
                                <div>
                                    <span>{data.payPrice} 원</span>
                                </div>
                                <div>
                                    <span><Refund num={data.num} type={param.type} data={groupedData[resKey]}/></span>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <div style={{ textAlign: "center" }}>
                    <h3>&quot;{email}&quot;님의 예약된 항공편이 없습니다.</h3>
                </div>
            )}
        </div>
    );
}
