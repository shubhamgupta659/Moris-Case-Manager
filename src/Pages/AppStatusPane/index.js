import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row,Collapse } from 'antd';
import { useNavigate } from "react-router-dom";
const { Panel } = Collapse;

function AppStatusPane({ parentData }) {
    const navigate = useNavigate();
    const [postResult, setPostResult] = useState([]);
    async function fetchStatusCount() {
        let msg = JSON.stringify({
            "dataSource": "Singapore-free-cluster",
            "database": "appWorkflow",
            "collection": "applications",
            "pipeline": [
                {
                    "$group": {
                        "_id": {
                            "caseStatus": "$caseStatus"
                        },
                        "count": { "$sum": 1 },
                    }
                },
                { "$sort": { "_id.caseStatus": 1 } }
            ],

        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gqwih/endpoint/data/v1/action/aggregate',
            headers: {
                'api-key': 'ox92OF8v8L0rEaIvT10XLtBR3miiJVEvS0gvvivhcXKtbyPggS4GZ6crLQlYL30n',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            data: msg
        };

        await axios.request(config)
            .then((response) => {
                setPostResult(response.data.documents);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        if (parentData) {
            fetchStatusCount();
        }
    }, parentData);

    const onCardClick = (item) => {
        navigate(`/oic/${item._id.caseStatus}`);
    };

    return (
        <div className='status-main-container'>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Case Status Count" key="1">
                    <Row className="rowgap-vbox" gutter={[15]}>
                        {postResult.map((c, index) => (
                            <Col
                                key={index}
                                xs={2}
                                className="mb-24"
                                onClick={() => onCardClick(c)}
                            >
                                <Card bordered={true} className="criclebox" style={{
                                    backgroundColor:
                                        c._id.caseStatus === 'S1 Draft'
                                            ? '#ff9800'
                                            : c._id.caseStatus === 'S1 Submitted'
                                                ? '#42a5f5'
                                                : c._id.caseStatus.includes('Rejected')
                                                    ? '#c62828'
                                                    : c._id.caseStatus.includes('Approved')
                                                        ? '#4caf50'
                                                        : c._id.caseStatus.includes('Clarification')
                                                            ? '#ef5350'
                                                            : c._id.caseStatus.includes('Clarified')
                                                                ? '#ba68c8'
                                                                : '#e65100',
                                    color: '#fff',
                                    textAlign: 'center',
                                }}>
                                    <div className="number" >
                                        <Row align="middle" gutter={[10, 0]}>
                                            <Col className='card-content-container' xs={3}>
                                                <div className="icon-box">{c._id.caseStatus}</div>
                                                <div className='box-line'><hr></hr></div>
                                                <div>{c.count}</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Panel>
            </Collapse>
        </div >);

}

export default AppStatusPane;