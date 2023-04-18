import React from 'react';
import { Card, Col, Row } from 'antd';
import { useNavigate } from "react-router-dom";


function NavCards(props) {
    console.log(props.active);
    const navItems = [
        {
            label: "Apply New Incentive",
            key: "applyNewIncentive",
            id: 1,
        },
        {
            label: "Submit ARR",
            key: "submitArr",
            id: 2,
        },
        {
            label: "Renew Award",
            key: "renewAward",
            id: 3,
        },
        {
            label: "Notify Changes",
            key: "notifyChanges",
            id: 4,
        },
        {
            label: "Terminate Award",
            key: "saoc",
            id: 5,
        },
    ];

    const navigate = useNavigate();
    const onNavClick = (item) => {
        navigate(`/${item.key}`);
    };
    return (
        <Row className="rowgap-vbox" gutter={[15]}>
            {navItems.map((c, index) => (
                <Col
                    key={index}
                    xl={4}
                    className="mb-23"
                    onClick={()=>onNavClick(c)}
                >
                    <Card bordered={true} className="criclebox">
                        <div className="number" >
                            <Row align="middle" gutter={[10, 0]}>
                                <Col className='card-content-container' xs={3}>
                                    <div className="icon-box">{c.label}</div>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default NavCards;