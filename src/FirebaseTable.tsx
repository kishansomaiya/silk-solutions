import React, { useState, useEffect } from "react";
import { child, get } from "firebase/database";
import dbRef from "./firebaseConfig";
import ExpandableRow from "./ExpandableRow";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./App.css";

ChartJS.register(ArcElement, Tooltip, Legend);
const FirebaseTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  /* getting data */
  useEffect(() => {
    get(child(dbRef, `/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  /*seperating data into grouped and raw findings */

  const grouped_findings = data.slice(0, 99);
  const raw_findings = data.slice(101, 200);

  /* handling collapse and expand */

  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleRowClick = (groupId: string) => {
    if (expandedRow === groupId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(groupId);
    }
  };

  /*filling raw finding table */

  const getRandomRawFindings = () => {
    const randomRawFindings = [];
    const keys = Object.keys(raw_findings);
    for (let i = 0; i < 10; i++) {
      const randomKey: any = keys[Math.floor(Math.random() * keys.length)];
      randomRawFindings.push(raw_findings[randomKey]);
    }
    return randomRawFindings;
  };

  /* chart data creation and color picking */

  const Chartdata = {
    labels: ["Critical", "Medium", "High", "Low"],
    datasets: [
      {
        label: "# of Votes",
        data: [1, 7, 8, 83],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
    <div className="container">
      <table className="main-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Severity</th>
            <th>Time</th>
            <th>SLA</th>
            <th>Description</th>
            <th>Security Analyst</th>
            <th>Owner</th>
            <th>Workflow</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="grouped_findings">
          {grouped_findings.map((groupFinding) => (
            <React.Fragment key={groupFinding.id}>
              <tr onClick={() => handleRowClick(groupFinding.id)}>
                <td>
                  <button onClick={toggleExpand}>
                    {isExpanded ? "^" : "v"}
                  </button>
                </td>
                <td>{groupFinding.severity}</td>
                <td>{groupFinding.grouped_finding_created}</td>
                <td>{groupFinding.sla}</td>
                <td>{groupFinding.description}</td>
                <td>{groupFinding.security_analyst}</td>
                <td>{groupFinding.owner}</td>
                <td>{groupFinding.workflow}</td>
                <td>{groupFinding.status}</td>
              </tr>
              {expandedRow === groupFinding.id && (
                <tr className="expanded-row">
                  <td colSpan={9}>
                    <div className="raw_findings_table">
                      <table>
                        <thead>
                          <tr>
                            <th>Severity</th>
                            <th>Time</th>
                            <th>Source</th>
                            <th>Description</th>
                            <th>Asset</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getRandomRawFindings().map((rawFinding, index) => (
                            <tr key={index}>
                              <td>{rawFinding.severity}</td>
                              <td>{rawFinding.finding_created}</td>
                              <td>{rawFinding.source_security_tool_name}</td>
                              <td>{rawFinding.description}</td>
                              <td>{rawFinding.asset}</td>
                              <td>{rawFinding.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      
    </div>
    <div className="chart-container">
        <Doughnut data={Chartdata} />
      </div>
    </>
  );
};

export default FirebaseTable;
