import { useEffect, useState } from "react";
import { getDayById, getTravelById, getTravelExpenseById } from "../service/api";
import { useParams } from "react-router-dom";

interface ExpenseValue {
    countryCurrency: string[];
    value: number[];
}

interface TotalExpense {
    americanDollar: number;
    brazilianReal: number;
    mexicanPeso: number;
    poundSterling: number;
    euro: number;
    canadianDollar: number;
}

function TotalExpenseValue(){

    const { id, idDay } = useParams<{id: string, idDay: string}>();
    const [expense, setExpense] = useState<ExpenseValue>(
        { countryCurrency: [], value: [] }
    );
    const [totalExpense, setTotalExpense] = useState<TotalExpense>(
        { americanDollar: 0, brazilianReal: 0, mexicanPeso: 0, poundSterling: 0, euro: 0, canadianDollar: 0 }
    );
    const [loading, setLoading] = useState<boolean>(true);

    function loadTotalExpense() {
        let total: TotalExpense = { 
            americanDollar: 0, 
            brazilianReal: 0,
            mexicanPeso: 0, 
            poundSterling: 0, 
            euro: 0, 
            canadianDollar: 0 
        }
        console.log(expense.countryCurrency.length)
        if(expense.countryCurrency.length == 0){
            setTotalExpense(total);
        }
        expense.countryCurrency.map((item: string, index: number) => {        
            if (item === "American Dollar") {
                total = {...total, americanDollar: total.americanDollar += Number(expense.value[index])}
            } else if (item === "Brazilian Real") {
                total = {...total, brazilianReal: total.brazilianReal += Number(expense.value[index])}
            } else if (item === "Mexican Peso") {
                total = {...total, mexicanPeso: total.mexicanPeso += Number(expense.value[index])}
            } else if (item === "Pound Sterling") {
                total = {...total, poundSterling: total.poundSterling += Number(expense.value[index])}
            } else if (item === "Euro") {
                total = {...total, euro: total.euro += Number(expense.value[index])}
            } else if (item === "Canadian Dollar") {
                total = {...total, canadianDollar: total.canadianDollar += Number(expense.value[index])}
            }
            setTotalExpense(total);
        });

    }

    async function loadExpense(){
        setLoading(true)
        const responseTravel = await getTravelById(id as string);
        let value: ExpenseValue = { countryCurrency: [], value: [] }
        if(id && !idDay){
            if(responseTravel.data.travelExpenseId.length == 0){
                setTotalExpense( { 
                    americanDollar: 0, 
                    brazilianReal: 0,
                    mexicanPeso: 0, 
                    poundSterling: 0, 
                    euro: 0, 
                    canadianDollar: 0 
                })
                return
            }
            const responseTravelExpense = await Promise.all(responseTravel.data.travelExpenseId.map((id: string) => getTravelExpenseById(id as string)));
            value = { countryCurrency: responseTravelExpense.map(item => item.data.countryCurrency ), value: responseTravelExpense.map(item => item.data.value) };
        }else{
            const responseDay = await Promise.all(responseTravel.data.dayId.map((id: string) => getDayById(id as string)));
            const dayAux = responseDay.map(item => item.data.dailyExpenseId);
            if(dayAux.length == 0){
                setTotalExpense( { 
                    americanDollar: 0, 
                    brazilianReal: 0,
                    mexicanPeso: 0, 
                    poundSterling: 0, 
                    euro: 0, 
                    canadianDollar: 0 
                })
                return
            };
            const responseDailyExpense = await Promise.all(dayAux.map((id: string) => getTravelExpenseById(id as string)));
            value = { countryCurrency: responseDailyExpense.map(item => item.data.countryCurrency ), value: responseDailyExpense.map(item => item.data.value) };
            responseDailyExpense.map(item => item.data );
        }
        setExpense(value);
    }

    useEffect(() => {
        setLoading(false)
    },[totalExpense])

    useEffect(() => {
        loadTotalExpense();
    },[expense])

    useEffect(() => {
        loadExpense();
    },[])

    return(

        <div style={{display: "flex"}}>
            <div style={{border: "3px solid black", borderRadius: "9px", width: "14rem"}}>
                <h3>American Dollar</h3>
                <p>{ loading ? "" : `$${totalExpense.americanDollar}`}</p>
            </div>
            <div style={{border: "3px solid black", borderRadius: "9px", width: "14rem"}}>
                <h3>Brazilian Real</h3>
                <p>{ loading ? "" : `R$${totalExpense.brazilianReal}`}</p>
            </div>
            <div style={{border: "3px solid black", borderRadius: "9px", width: "14rem"}}>
                <h3>Mexican Peso</h3>
                <p>{ loading ? "" : `MEX$${totalExpense.mexicanPeso}`}</p>
            </div>
            <div style={{border: "3px solid black", borderRadius: "9px", width: "14rem"}}>
                <h3>Pound Sterling</h3>
                <p>{ loading ? "" : `£${totalExpense.poundSterling}`}</p>
            </div>
            <div style={{border: "3px solid black", borderRadius: "9px", width: "14rem"}}>
                <h3>Euro</h3>
                <p>{ loading ? "" : `€${totalExpense.euro}`}</p>
            </div>
            <div style={{border: "3px solid black", borderRadius: "9px", width: "14rem"}}>
                <h3>Canadian Dollar</h3>
                <p>{ loading ? "" : `C$${totalExpense.canadianDollar}`}</p>
            </div>
        </div>
    )
}

export default TotalExpenseValue;