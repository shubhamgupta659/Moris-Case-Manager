import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'antd';
import { useNavigate } from "react-router-dom";

const AppStatusPane = () => {
    const navigate = useNavigate();
    const [postResult, setPostResult] = useState([]);

    async function fetchStatusCount(){
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
                { "$sort": { "count": 1 } }
            ]
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gqwih/endpoint/data/v1/action/aggregate',
            headers: {
                'api-key': 'ox92OF8v8L0rEaIvT10XLtBR3miiJVEvS0gvvivhcXKtbyPggS4GZ6crLQlYL30n',
                'Content-Type': 'application/json',
            },
            data: msg
        };

        await axios.request(config)
            .then((response) => {
                console.log(response.data.documents);
                setPostResult(response.data.documents);

            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchStatusCount();
    }, []);

    const onCardClick = (item) => {
        navigate(`/oic/${item._id.caseStatus}`);
    };

    return (
        <div className='status-main-container'>
            <Row className="rowgap-vbox" gutter={[15]}>
                {postResult.map((c, index) => (
                    <Col
                        key={index}
                        xs={2}
                        className="mb-24"
                        onClick={() => onCardClick(c)}
                    >
                        <Card bordered={true} className="criclebox">
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
        </div>);

}

export default AppStatusPane;