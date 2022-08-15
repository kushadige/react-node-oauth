import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ platforms }){

    const values = Object.values(platforms).map(el => el.count);

    const generateColors = (len = Object.keys(platforms).length) => {
        const arr = [];

        for(let i = 0; i < len; i++) {
            const randomColor = `rgba(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.random()})`;

            arr.push(randomColor);
        }

        return arr;
    }

    const colors = generateColors();

    const data = {
        labels: Object.keys(platforms),
        datasets: [
          {
            label: '# of Votes',
            data: values,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      };
    return(
        <div className='w-25 mx-auto' style={{minWidth: 250, marginTop: '-25px'}}>
            <h4 className='text-center mb-3' style={{color: '#333'}}>Platforms</h4>
            <Pie data={data} />
        </div>
    );
}

export default PieChart;