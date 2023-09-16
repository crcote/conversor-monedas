const btnCalculate = document.getElementById("btn-calculate");

btnCalculate.addEventListener("click", async ()=>{
    const inputClp = document.getElementById("input-clp");
    const selectExchange = document.getElementById("select-exchange");
    if (selectExchange.value !="" && inputClp.value != "") {
        await calculate(inputClp.value, selectExchange.value);
    }
});

const calculate =  async (clp,tipoMoneda) =>{
    const apiUrl = `https://mindicador.cl/api/${tipoMoneda}`
    const total = document.getElementById("total");
    try {
        const res = await fetch (apiUrl);
        const dataExchange = await res.json();
        console.log(dataExchange.serie[0].valor)
        const valueExchange = dataExchange.serie[0].valor;
        console.log(clp/valueExchange);
        const calculateExchange = (clp/valueExchange).toFixed(2);        
        total.innerHTML = `<p>Resultado: ${calculateExchange}</p>`
        const firstTenValuesArray = (dataExchange.serie).slice(0,10); //usamos solo los primeros 10 valores del arreglo original
        getAndUpdateDatatoChart(firstTenValuesArray); 
    } catch(error){
        console.log(error)
        total.innerHTML = "Ha ocurrido un error";
    }
} 

const getAndUpdateDatatoChart = (arraySeries) => {
    console.log(Chart.getChart("myChart"));
    if (Chart.getChart("myChart") !=undefined) {
        Chart.getChart("myChart").destroy();
    }
    const dates = arraySeries.map((element)=> element.fecha);
    const values = arraySeries.map((element) => element.valor);
    const chartDom = document.getElementById("myChart");
    const config = {
        type: "line",
        data: {
            labels: dates,
            datasets: [
                {
                    label: "Valor histórico de la moneda 10 dias",
                    backgroundColor: "red",
                    data: values,
                }
            ]

        }
    }
    new Chart(chartDom, config);
}

