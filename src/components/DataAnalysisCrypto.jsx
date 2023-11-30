import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import Chart from 'chart.js/auto';
import faker from 'faker';

const generateRandomCryptoData = () => {
  const cryptoList = ['Bitcoin', 'Ethereum', 'Binance Coin'];

  const data = [];

  for (let i = 0; i < 100; i++) {
    const bitcoinInvestment = Math.random() * 1000;
    const ethereumInvestment = Math.random() * 800;
    const binanceCoinInvestment = Math.random() * 500;

    data.push({
      customer: faker.name.findName(), // Use faker to generate random names
      Bitcoin: bitcoinInvestment,
      Ethereum: ethereumInvestment,
      'Binance Coin': binanceCoinInvestment,
    });
  }

  return { columns: ['customer', 'Bitcoin', 'Ethereum', 'Binance Coin'], data };
};

const DataAnalysisCrypto = () => {
    const [cryptoData, setCryptoData] = useState(generateRandomCryptoData());
    const [barChartInstance, setBarChartInstance] = useState(null);
    const [pieChartInstance, setPieChartInstance] = useState(null);
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);
  
    const columns = React.useMemo(
      () => [
        { Header: 'Customer', accessor: 'customer' },
        { Header: 'Bitcoin', accessor: 'Bitcoin' },
        { Header: 'Ethereum', accessor: 'Ethereum' },
        { Header: 'Binance Coin', accessor: 'Binance Coin' },
      ],
      []
    );
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      state: { pageIndex, pageSize },
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
    } = useTable(
      { columns, data: cryptoData.data, initialState: { pageIndex: 0, pageSize: 10 } },
      usePagination
    );
  
    // Calculate total investments in each cryptocurrency
    const totalInvestments = useMemo(() => {
      return cryptoData.columns
        .filter((crypto) => crypto !== 'customer')
        .map((crypto) => ({
          currency: crypto,
          total: cryptoData.data.reduce((sum, customer) => sum + customer[crypto], 0),
        }));
    }, [cryptoData.columns, cryptoData.data]);
  
    // Create chart data
    const chartData = useMemo(() => {
      return {
        labels: totalInvestments.map((crypto) => crypto.currency),
        data: totalInvestments.map((crypto) => crypto.total),
      };
    }, [totalInvestments]);

  // Create or update bar chart
     // Create or update bar chart and pie chart
  useEffect(() => {
    const barCtx = document.getElementById('barChart').getContext('2d');
    const pieCtx = document.getElementById('pieChart').getContext('2d');

    if (!barChartRef.current) {
      barChartRef.current = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: 'Total Investments',
              data: chartData.data,
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 205, 86, 0.2)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 205, 86, 1)',
              ],
              borderWidth: 3,
            },
          ],
        },
        options: {
            scales: {
              x: {
                beginAtZero: true,
                ticks: {
                  color: 'white',
                  position: 'bottom',
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 500,
                  color: 'white',
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: 'white',
                },
              },
            },
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
              },
            },
            barPercentage: 0.8,
            categoryPercentage: 1.0,
          },
      });
      setBarChartInstance(barChartRef.current);
    } else {
      barChartRef.current.data.datasets[0].data = chartData.data;
      barChartRef.current.update();
    }

    if (!pieChartRef.current) {
      pieChartRef.current = new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              data: chartData.data,
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 205, 86, 0.2)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 205, 86, 1)',
              ],
              borderWidth: 3,
            },
          ],
        },
        options: {
          },
      });
      setPieChartInstance(pieChartRef.current);
    } else {
      pieChartRef.current.data.datasets[0].data = chartData.data;
      pieChartRef.current.update();
    }

    return () => {
      if (barChartRef.current) {
        barChartRef.current.destroy();
        barChartRef.current = null;
      }

      if (pieChartRef.current) {
        pieChartRef.current.destroy();
        pieChartRef.current = null;
      }
    };
  }, [chartData]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white text-center mt-8">Crypto Investment Analysis</h2>

      {/* Table */}
      <table {...getTableProps()} className="w-full border-collapse mt-12">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-blue-500 text-white">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-4 text-left"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={index}
                className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 border-b border-gray-300"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination mt-4 text-white text-center">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={`px-3 py-1 bg-blue-500 rounded-md ${!canPreviousPage ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>{' '}
        <span className="mx-4">
          Page{' '}
          <strong className="text-lg">
            {pageIndex + 1} of {Math.ceil(cryptoData.data.length / pageSize)}
          </strong>{' '}
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={`px-3 py-1 bg-blue-500 rounded-md ${!canNextPage ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>{' '}
      </div>

      <h2 className="text-2xl font-bold text-white text-center mt-8">Bar Chart</h2>
      <div className="chart-container flex items-center justify-center mt-12" style={{ height: '40vh', width: '80vw' }}>
        <canvas id="barChart"></canvas>
    </div>

    {/* Pie Chart */}
    <h2 className="text-2xl font-bold text-white text-center mt-8">Pie Chart</h2>
    <div className="chart-container flex items-center justify-center mt-12" style={{ height: '40vh', width: '80vw' }}>
        <canvas id="pieChart"></canvas>
      </div>
    </div>
  );
};

export default DataAnalysisCrypto;