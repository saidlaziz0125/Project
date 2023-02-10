window.addEventListener("load", ()=>{
    document.querySelector(".ferma_nomi").addEventListener("change", ()=>{
        let ferma = document.querySelector(".ferma_nomi").value;
        console.log(ferma);
        fetch("http://localhost:8080/note")
        .then(res=> {
            return res.json()
        })
        .then(data=>{
            console.log(data);
            const ctx = document.getElementById('myChart').getContext('2d');
            let newData=[];
            data.forEach((element, i) => {
                if(element.ferma== ferma) {
                    newData.push(element)
                }
            });
            console.log(newData);
            let labels = [];
            let dataT = [];
            newData.forEach((element, i) => {
                dataT[i]=element.kelganSut
                labels[i]=element.date
            });

            let newLabels = [];
            labels.forEach((element, i) => {
               let n = new Date(element).toLocaleDateString()
                newLabels.push(n)
            });
            // - - -
            let myChart = new Chart(ctx, {
                type: 'line',
                    data: {
                        labels: newLabels,
                        datasets: [{
                            label: 'Kelgan Sut',
                            data: dataT,
                            backgroundColor: [
                                'coral'
                            ],
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }]
                    },
                });
        })
        // .catch(err=>{
        //     console.log("Xatolik");
        // })

    })

})