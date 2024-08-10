import axios from "axios";
import PayButton from "./pay";
import Price from "./price";
import cookie from "js-cookie"

export default async function FlightList(props){
    let depCityCode, arrCityCode;
    const param = props.searchParams;
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = ("0"+(currentTime.getMonth()+1)).slice(-2);
    const day = currentTime.getDate().toString().padStart(2, '0');
    const hours = ("0"+currentTime.getHours()).slice(-2);
    const minutes = ("0"+currentTime.getMinutes()).slice(-2);
    const formattedTime = `${year}${month}${day}${hours}${minutes}`;
    
    switch(param.depCity.toString()){
        case "서울": 
            depCityCode = "NAARKSS";
            break;
        case "인천": 
            depCityCode = "NAARKSI";
            break;
        case "광주":
            depCityCode = "NAARKJJ";
            break;
        case "부산":
            depCityCode = "NAARKPK";
            break;
        case "제주":
            depCityCode = "NAARKPC";
            break;
        default:
            break;
    }
    switch(param.arrCity){
        case "서울": 
            arrCityCode = "NAARKSS";
            break;
        case "인천": 
            arrCityCode = "NAARKSI";
            break;
        case "광주":
            arrCityCode = "NAARKJJ";
            break;
        case "부산":
            arrCityCode = "NAARKPK";
            break;
        case "제주":
            arrCityCode = "NAARKPC";
            break;
        default:
            break;
    }
    
    const res = await axios.get(`http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList?serviceKey=${process.env.NEXT_FLIGHT_API_KEY}&numOfRows=100&depAirportId=${depCityCode}&arrAirportId=${arrCityCode}&depPlandTime=${param.date}`);
    const list = await res.data.response.body.items.item;

    const filteredList = list.filter(data => data.economyCharge != null && parseInt(data.depPlandTime)>parseInt(formattedTime));
    const realList = await Promise.all(filteredList.map(async data => {
        const response = await axios.get(`http://localhost:8080/seat/num/${param.date + data.vihicleId}`);
        const res1 = response.data;
        console.log(res1);
        console.log(param.date+data.vihicleId);
        if (res1 === 0 || res1 >= param.quantity) {
            return data;
        }
        else
            return null;
    }));
    const list2 = realList.filter((item)=>item!==null);
    
    return (
        Price&&<div className="flightItemWrapper">
            {list2 && list2.length > 0 ? (
                list2.map((data, index)=>{
                    return(
                        <div className="flightItem" key={index}>
                            <div>
                                <span className="airLine">{data.airlineNm}</span>
                            </div>
                            <div className="flexTime">
                                <div className="fromTo">
                                    <div>{data.depAirportNm}</div>
                                    <div>{data.depPlandTime.toString().slice(-4)}</div>
                                </div>
                                <div className="arrow"></div>
                                <div>
                                    <div>{data.arrAirportNm}</div>
                                    <div>{data.arrPlandTime.toString().slice(-4)}</div>
                                </div>
                            </div>
                            {/* <Price economyCharge={data.economyCharge} prestigeCharge={data.prestigeCharge}/> */}
                            <div>
                                <Price economyCharge={data.economyCharge} prestigeCharge={data.prestigeCharge}/>
                            </div>
                            <PayButton flightId={data.vihicleId} depTime={data.depPlandTime} arrTime={data.arrPlandTime} date={param.date} airLine={data.airlineNm} economyCharge={data.economyCharge} prestigeCharge={data.prestigeCharge}/>
                        </div>
                    )    
                })
            ) : (
                <div>&quot;{param.depCity}행 ~ {param.arrCity}행&quot;에 대한 검색 결과가 없습니다.</div>
            )}
        </div>
    );
    
}
