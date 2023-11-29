import React, { useState, useEffect, useRef } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import Chart from 'chart.js/auto';

const generateRandomData = () => {
  const applicationTypes = ['Credit Card', 'Home Loan', 'Personal Loan', 'Auto Loan'];
  const approvalStatusOptions = ['Approved', 'Denied'];
  const reasonForDenialOptions = ['Insufficient Credit Score', 'Incomplete Information', 'High Debt-to-Income Ratio', 'Other'];

  const data = [];

  for (let i = 0; i < 100; i++) {
    const applicationType = applicationTypes[i % applicationTypes.length];
    const approvalStatus = approvalStatusOptions[Math.floor(Math.random() * approvalStatusOptions.length)];

    let reasonForDenial = null;
    if (approvalStatus === 'Denied') {
      reasonForDenial = reasonForDenialOptions[Math.floor(Math.random() * reasonForDenialOptions.length)];
    }

    data.push({ type: applicationType, approvalStatus, reasonForDenial });
  }

  return data;
};

const DataAnalyticsApplication = () => {
    const [applicationData, setApplicationData] = useState(generateRandomData());
    const [chartInstance, setChartInstance] = useState(null);
    const [barChartInstance, setBarChartInstance] = useState(null);
    const [pieChartInstance, setPieChartInstance] = useState(null);
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);
  

    const columns = React.useMemo(
      () => [
        { Header: 'Application Type', accessor: 'type' },
        { Header: 'Approval Status', accessor: 'approvalStatus' },
        { Header: 'Reason for Denial', accessor: 'reasonForDenial' },
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
        { columns, data: applicationData, initialState: { pageIndex: 0, pageSize: 10 } },
        useSortBy,
        usePagination
      );
    
      const analysisData = React.useMemo(() => {
        return {
          totalApplications: applicationData.length,
          approvedApplications: applicationData.filter((app) => app.approvalStatus === 'Approved').length,
          deniedApplications: applicationData.filter((app) => app.approvalStatus === 'Denied').length,
        };
      }, [applicationData]);
    
      // Create chart data
      const chartData = React.useMemo(() => {
        const applicationTypeCounts = {
          Approved: [],
          Denied: [],
        };
      
        applicationData.forEach((app) => {
          const type = app.type;
          if (app.approvalStatus === 'Approved') {
            applicationTypeCounts.Approved.push(type);
          } else {
            applicationTypeCounts.Denied.push(type);
          }
        });
      
        const labels = Object.keys(applicationTypeCounts);
        const data = labels.map((label) => applicationTypeCounts[label].length);
      
        return { labels, data, datasets: applicationTypeCounts };
      }, [applicationData]);


        // Create a new chart instance if it doesn't exist
        useEffect(() => {
            const ctx = document.getElementById('barChart').getContext('2d');
        
            if (!barChartRef.current) {
              barChartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                  labels: chartData.labels,
                  datasets: [
                    {
                      label: 'Approved',
                      data: [chartData.datasets.Approved.length],
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 3,
                    },
                    {
                      label: 'Denied',
                      data: [chartData.datasets.Denied.length],
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 3,
                    },
                  ],
                },
              options: {
                scales: {
                  x: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white', // Set x-axis text color to white
                        position: 'bottom',
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 5,
                      color: 'white', // Set y-axis text color to white
                    },
                  },
                },
                plugins: {
                  legend: {
                    labels: {
                      color: 'white', // Set legend text color to white
                    },
                  },
                },
                layout: {
                  padding: {
                    left: 10, // Adjust as needed
                    right: 10, // Adjust as needed
                    top: 10,
                    bottom: 10,
                  },
                },
                barPercentage: 0.8, // Adjust to control the width of the bars
                categoryPercentage: 1.0, // Adjust to control the space between the bars
              },
            });  
        setBarChartInstance(barChartRef.current);
        } else {
          barChartRef.current.data.datasets[0].data = [chartData.datasets.Approved.length];
          barChartRef.current.data.datasets[1].data = [chartData.datasets.Denied.length];
          barChartRef.current.update();
        }
      
        // Cleanup: Destroy the chart when the component unmounts
        return () => {
            if (barChartRef.current) {
              barChartRef.current.destroy();
              barChartRef.current = null;
            }
          };
        }, [chartData]);

      // Create or update pie chart
  useEffect(() => {
    const ctx = document.getElementById('pieChart').getContext('2d');

    if (!pieChartRef.current) {
      pieChartRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Approved', 'Denied'],
          datasets: [
            {
              data: [analysisData.approvedApplications, analysisData.deniedApplications],
              backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 3,
            },
          ],
        },
        options: {
        },
      });
      setPieChartInstance(pieChartRef.current);
    } else {
      pieChartRef.current.data.datasets[0].data = [analysisData.approvedApplications, analysisData.deniedApplications];
      pieChartRef.current.update();
    }

    return () => {
      if (pieChartRef.current) {
        pieChartRef.current.destroy();
        pieChartRef.current = null;
      }
    };
  }, [analysisData]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white text-center mt-8">Data Analysis on Applications</h2>

      <table {...getTableProps()} className="w-full border-collapse mt-20">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-green-500 text-white">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-4 text-left"
                >
                  {column.render('Header')}
                  <span className="ml-2">{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
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
            {pageIndex + 1} of {Math.ceil(applicationData.length / pageSize)}
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

      <div className="text-white text-2xl mt-8 justify-center content-center">
        <p>Total Applications: {analysisData.totalApplications}</p>
        <p>Approved Applications: {analysisData.approvedApplications}</p>
        <p>Denied Applications: {analysisData.deniedApplications}</p>
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


export default DataAnalyticsApplication;