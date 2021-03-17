import React from "react";
import { useTable } from "react-table";
import Head from 'next/head'
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Layout from '../../components/Layout/Layout'

import styles from '../../styles/Subevents.module.css'

export default function Subevents() {

    const { user } = useUser();
    const router = useRouter()

    const data = React.useMemo(
        () => [
          {
            col1: '1',
            col2: 'Peermade',
            col3: 'Food',
            col4: 'Landslide',
            col5: 'Low',
            col6: <div>
                <button>Resolve</button>
            </div>
          },
          {
            col1: '2',
            col2: 'Peermade',
            col3: 'Rescue',
            col4: 'Landslide',
            col5: 'High',
            col6: <div>
                <button>Resolve</button>
            </div>
          },
          { 
            col1: '3',
            col2: 'Kanamala',
            col3: 'Water',
            col4: 'Flood',
            col5: 'High',
            col6: <div>
                <button>Resolve</button>
            </div>
          },
        ],
        []
      )
    const columns = React.useMemo(
        () => [
            {
            Header: ' ',
            accessor: 'col1',
            },
            {
            Header: 'Location',
            accessor: 'col2',
            },
            {
                Header: 'Request Type',
                accessor: 'col3',
            },
            {
                Header: 'Disaster Type',
                accessor: 'col4',
            },
            {
                Header: 'Urgency',
                accessor: 'col5',
            },
            {
                Header: 'Action',
                accessor: 'col6',
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data })

    useEffect(() => {
        if(user === undefined) {
            router.push('/') 
        }
    }, []) 

    return (
        <div className={styles.container}>
        <Head>
            <title>Neptune Dashboard</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
            <div className={styles.subevents}>
                <div className={styles.subevents__head}>
                    Subevents
                </div>
                <div className={styles.subevents__table}>
                    <table 
                        {...getTableProps()} 
                        style={{ 
                            width: "100%", 
                            backgroundColor: "#FFFFFF",
                            border: 'solid 1px #D8D8D8', 
                            borderRadius: "8px",
                            marginTop: "1rem"
                        }}>
                        <thead>
                            {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                    style={{
                                        fontSize: "16px",
                                        padding: "4px 0",
                                        color: "#2A2945",
                                        opacity: "0.7",
                                        fontWeight: "700",
                                        borderBottom: "solid 1px #D8D8D8"
                                    }}
                                >
                                    {column.render('Header')}
                                </th>
                                ))}
                            </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row, index) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} style={index%2 === 1? { backgroundColor: "#F8F8F8"} : null}>
                                {row.cells.map(cell => {
                                    return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '10px',
                                            textAlign: 'center',
                                            height: "64px",
                                            fontSize: "1rem",
                                            fontWeight: "500"
                                        }}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                    )
                                })}
                                </tr>
                            )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
        </div> 
    ) 
}