import React from 'react';
import cl from './ProgressBar.module.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
    { name: '5', uv: 4, pv: 2400, amt: 2400 },
    { name: '4', uv: 3, pv: 2400, amt: 2400 },
    { name: '3', uv: 2, pv: 2400, amt: 2400 },
    { name: '2', uv: 1, pv: 2400, amt: 2400 },
];

const ProgressBar: React.FC = () => {
    return (
        <div className={cl.root}>
            <div className={cl.content}>
                <div className={cl.progress_bar}>
                    <BarChart width={600} height={300} data={data}>
                        <XAxis dataKey="name" stroke="#8884d8" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Bar dataKey="uv" fill="#8884d8" barSize={30} />
                    </BarChart>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar;
