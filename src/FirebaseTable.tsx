// src/FirebaseTable.tsx

import React, { useState, useEffect } from 'react';
import {  child, get } from "firebase/database";
import dbRef from './firebaseConfig';
import ExpandableRow from './ExpandableRow';
import { Box, Collapse, IconButton, Paper, SxProps } from "@mui/material";
import { DataGrid, GridRenderCellParams, GridToolbar, GridColDef, GridToolbarContainer, GridToolbarExport, GridRowProps, GridRowParams } from "@mui/x-data-grid";

import { faker } from "@faker-js/faker";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);




const addresses: {
  [key: string]: any;
}[] = [];

for (let i = 0; i < 100; i++) {
  addresses.push({
      id: i+1,
    address: `${faker.address.streetAddress()} ${faker.address.secondaryAddress()}`,
    zip: faker.address.zipCode(),
    city: faker.address.city(),
    state: faker.address.state(),
  });
}

const datagridSx: SxProps = {
  marginTop: 4,
  borderRadius: 2,
  height: 500,
  textAlign: "center"
  //minHeight: 500
};

const detailStyles={
  borderTop: "2px solid",
  borderTopColor: "primary.main",
  pt: 2
}

const FirebaseTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    get(child(dbRef, `/`)).then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val())
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

    
  }, []);

  console.log(data)

  const grouped_findings = data.slice(0, 99);
  const raw_findings = data.slice(101, 200);

  // const [critical, setCritical] = useState(0)
  // const [high, setHigh] = useState(0)
  // const [medium, setMedium] = useState(0)
  // const [low, setLow] = useState(0)

  // grouped_findings.map((i)=> {
  //   if(i.severity == "critical") {
  //     setCritical(critical+1)
  //   } else if(i.severity == "high") {
  //     setHigh(high+1)
  //   } else if(i.severity == "medium") {
  //     setMedium(medium+1)
  //   } else {
  //     setLow(low+1)
  //   }
  // })




  const [clickedIndex, setClickedIndex] = useState(-1);

  const grouped_findings_columns: GridColDef[] = [
    {
      field: "id",
      renderCell: (cellValues: GridRenderCellParams<any>) => {
          return (<IconButton onClick={() => {clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value)}}>{cellValues.value === clickedIndex ? "^" : "v"}</IconButton>)
      },
      width: 60
    },
    {
      field: "grouping_type",
      headerName: "Grouping Type",
      renderCell: (cellValues: any) => {
        return (
          <Box><div>{cellValues.value}</div><Collapse in={cellValues.id === clickedIndex}><Box sx={detailStyles}>created: {grouped_findings[cellValues.id].grouped_finding_created}</Box></Collapse></Box>
        )
      },
      width: 250
    },
    { field: "severity", headerName: "Severity", flex: 1, editable: true,
    renderCell: (cellValues: GridRenderCellParams<any>) => {
      return (
        <Box><div>{cellValues.value}</div><Collapse in={cellValues.id === clickedIndex}><Box sx={detailStyles}></Box></Collapse></Box>
      )
    },
    width: 200
  },
    { field: "owner", headerName: "owner", flex: 1,
    renderCell: (cellValues: any) => {
      return (
        <Box><div>{cellValues.value}</div><Collapse in={cellValues.id === clickedIndex}><Box sx={detailStyles}>security_analyst: {grouped_findings[cellValues.id].security_analyst}</Box></Collapse></Box>
      )
    },
    width: 200
  },
    { field: "status", headerName: "Status", flex: 1, editable: true, 
    renderCell: (cellValues: any) => {
      return (
        <Box><div>{cellValues.value}</div><Collapse in={cellValues.id === clickedIndex}><Box sx={detailStyles}>progress: {grouped_findings[cellValues.id].progress}</Box></Collapse></Box>
      )
    },
    width: 200
  }
  ];
  const raw_findings_columns: GridColDef[] = [
    {
      field: "id",
      renderCell: (cellValues: GridRenderCellParams<any>) => {
          return (<IconButton onClick={() => {clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value)}}>{cellValues.value === clickedIndex ? "^" : "v"}</IconButton>)
      },
      width: 60
    },
    {
      field: "source_security_tool_name",
      headerName: "Security Tool",
      renderCell: (cellValues: GridRenderCellParams<any>) => {
        return (
          <Box><div>{cellValues.value}</div><Collapse in={cellValues.id === clickedIndex}><Box sx={detailStyles}></Box></Collapse></Box>
        )
      },
      width: 250
    },
    { field: "severity", headerName: "Severity", flex: 1, editable: true,
    renderCell: (cellValues: GridRenderCellParams<any>) => {
      return (
        <Box><div>{cellValues.value}</div><Collapse in={cellValues.id === clickedIndex}><Box sx={detailStyles}></Box></Collapse></Box>
      )
    },
    width: 200
  },
    { field: "source_collaboration_tool_name", headerName: "Collab Tool", flex: 1,
    renderCell: (cellValues: GridRenderCellParams<any>) => {
      return (
        <Box><div>{cellValues.value}</div><Collapse in={cellValues.id === clickedIndex}><Box sx={detailStyles}></Box></Collapse></Box>
      )
    },
    width: 200
  },
    { field: "status", headerName: "Status", flex: 1, editable: true, 
    renderCell: (cellValues: any) => {
      return (
        <Box><div>{cellValues.value}</div><Collapse in={cellValues.id === clickedIndex}><Box sx={detailStyles}>description: {raw_findings[cellValues.id].description}</Box></Collapse></Box>
      )
    },
    width: 200
  }
  ];



  const Chartdata = {
    labels: ['Critical', 'Medium', 'High', 'Low'],
    datasets: [
      {
        label: '# of Votes',
        data: [1, 7, 8, 83],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    
    // <div>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>ID</th>
    //         <th>Name</th>
    //         <th>Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {data.map((item: any) => (
    //         <React.Fragment key={item.id}>
    //           <ExpandableRow data={item} />
    //         </React.Fragment>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <>
    <Paper sx={datagridSx}>
      <DataGrid
        rows={grouped_findings}
        columns={grouped_findings_columns}
        rowHeight={100}
        pagination={true}
      />
    </Paper>

    <Paper sx={datagridSx}>
      <DataGrid
        rows={raw_findings}
        columns={raw_findings_columns}
        rowHeight={100}
        pagination={true}
      />
    </Paper>
      <div style={{maxHeight: '500px', maxWidth: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Doughnut data={Chartdata} />
    </div>

    </>
  );
};

export default FirebaseTable;
