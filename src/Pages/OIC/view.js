import React, { useState, useRef, useEffect } from 'react';
import AppStatusPane from "../AppStatusPane";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Col, Row } from 'antd';


const ViewAppAction = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const params = useParams();
    useEffect(() => {

    }, []);
    return (
        <div className='view-main-container'>
            <div className='view-status-pane'><AppStatusPane /></div>
            <div>
                <Row>
                    <Col span={12}>
                        <div className='view-form-container'>
                            <div className='view-form-header'>
                                <h2>View Application</h2>
                            </div>
                            <div className='view-form-sep'><hr></hr></div>
                            <div className='view-form-content'>
                                <div className='form-row'>
                                    <div className='form-label'>Application Id : &nbsp;</div>
                                    <div className='form-value'>{state.applicationId}</div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-label'>Fi Name : &nbsp;</div>
                                    <div className='form-value'>{state.fiName}</div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-label'>UID : &nbsp;</div>
                                    <div className='form-value'>{state.uid}</div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-label'>ID Type : &nbsp;</div>
                                    <div className='form-value'>{state.idType}</div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-label'>UEN No. : &nbsp;</div>
                                    <div className='form-value'>{state.uenNumber}</div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-label'>Country of Origin : &nbsp;</div>
                                    <div className='form-value'>{state.countryOfOrigin}</div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-label'>Address : &nbsp;</div>
                                    <div className='form-value'>{state.address}</div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-label'>Gender : &nbsp;</div>
                                    <div className='form-value'>{state.gender}</div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-label'>Date of Birth : &nbsp;</div>
                                    <div className='form-value'>{state.dob}</div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-label'>App Type : &nbsp;</div>
                                    <div className='form-value'>{state.appType}</div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-label'>Role : &nbsp;</div>
                                    <div className='form-value'>{state.role}</div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-label'>App Status : &nbsp;</div>
                                    <div className='form-value'>{state.appStatus}</div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='view-form-container'>

                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ViewAppAction;