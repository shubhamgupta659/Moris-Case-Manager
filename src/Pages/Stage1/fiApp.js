import { useLocation, useParams, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Form, Checkbox, Input, Select, DatePicker, Button, Tooltip, Collapse } from 'antd';
import axios from 'axios';
import moment from "moment";
import { RollbackOutlined } from '@ant-design/icons';
import { AuthContext } from "../../AuthContext";
const { Panel } = Collapse;
const { TextArea } = Input;

const Stage1App = () => {
    const { accessToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const { state } = useLocation();
    const params = useParams();
    const formRef = useRef();
    const [size, setSize] = useState('small');
    const [formData, setFormData] = useState({
        caseId: state ? state.caseId : params.id,
        name: state ? state.name : null,
        uid: state ? state.uid : null,
        idType: state ? state.idType : null,
        uenNumber: state ? state.uenNumber : null,
        location: state ? state.location : null,
        address: state ? state.address : null,
        gender: state ? state.gender : null,
        dob: state ? state.dob : null,
        role: state ? state.role : null,
        caseType: state ? state.caseType : null,
        description: state ? state.description : null,
        operatorName: state ? state.operatorName : null,
        caseClassification: state ? state.caseClassification : null,
        doi: state ? state.doi : null,
        assignee: state ? state.assignee : null,
        caseStatusId: state ? state.caseStatusId : null,
        caseStatus: null,
        comment: state ? state.comment : null
    });

    const genderOptions = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];

    const idOptions = [
        { value: 'NRIC', label: 'NRIC' },
        { value: 'FIN', label: 'FIN' },
        { value: 'PP', label: 'PP' },
    ];

    const roleOptions = [
        { value: 'Perpetrator', label: 'Perpetrator' },
        { value: 'Accomplice', label: 'Accomplice' },
        { value: 'Witness', label: 'Witness' },
    ];

    const countryOptions = [
        { value: 'SG', label: 'SG' },
        { value: 'IN', label: 'IN' },
        { value: 'MY', label: 'MY' },
        { value: 'USA', label: 'USA' },
    ];

    const caseTypeOptions = [
        { value: 'Regulatory Offences', label: 'Regulatory Offences' },
        { value: 'Forfeiture Offences', label: 'Forfeiture Offences' },
        { value: 'Breaches', label: 'Breaches' },
    ];

    const caseClassificationOptions = [
        { value: 'Sensitive', label: 'Sensitive' },
        { value: 'Non-Sensitive', label: 'Non-Sensitive' },
    ];

    const operatorNameOptions = [
        { value: 'ABC Pvt Ltd.', label: 'ABC Pvt Ltd.' },
        { value: 'CDE Pte Ltd.', label: 'CDE Pte Ltd.' },
    ];

    const handleChange = (value) => {
    };

    const onChange = (checkedValues) => {
    };

    const dateOnChange = (date, dateString) => {
    };

    const handleSaveDraft = e => {
        formRef.current.validateFields().then((values) => {
            setFormData({
                caseId: params.id,
                name: values.name,
                uid: values.uid,
                idType: values.idType,
                uenNumber: values.uenNumber,
                location: values.location,
                address: values.address,
                gender: values.gender,
                dob: values.dob,
                role: values.role,
                caseType: values.caseType,
                description: values.description,
                operatorName: values.operatorName,
                caseClassification: values.caseClassification,
                doi: values.doi,
                assignee: 'ASO',
                caseStatusId: 1,
                caseStatus: 'Draft',
                comment: ''
            });
        });
    };

    const handleFormSubmit = () => {
        formRef.current.validateFields().then((values) => {
            setFormData({
                caseId: params.id,
                name: values.name,
                uid: values.uid,
                idType: values.idType,
                uenNumber: values.uenNumber,
                location: values.location,
                address: values.address,
                gender: values.gender,
                dob: values.dob,
                role: values.role,
                caseType: values.caseType,
                description: values.description,
                operatorName: values.operatorName,
                caseClassification: values.caseClassification,
                doi: values.doi,
                assignee: 'ASO',
                caseStatusId: 2,
                caseStatus: 'Open',
                comment: ''
            })
        });

    };

    const insertCase = (data) => {
        let msg = JSON.stringify({
            "dataSource": "Singapore-free-cluster",
            "database": "appWorkflow",
            "collection": "applications",
            "document": data
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gqwih/endpoint/data/v1/action/insertOne',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            data: msg
        };

        axios.request(config)
            .then((response) => {
                navigate(`/stage1`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateCase = (data) => {
        let msg = JSON.stringify({
            "dataSource": "Singapore-free-cluster",
            "database": "appWorkflow",
            "collection": "applications",
            "filter": { "_id": { "$oid": state._id } },
            "update": {
                "$set": data
            }
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gqwih/endpoint/data/v1/action/updateOne',
            headers: {
                'api-key': 'ox92OF8v8L0rEaIvT10XLtBR3miiJVEvS0gvvivhcXKtbyPggS4GZ6crLQlYL30n',
                'Content-Type': 'application/json',
            },
            data: msg
        };

        axios.request(config)
            .then((response) => {
                navigate(`/stage1`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (formData.caseStatus != null)
            if (params.action === 'add') {
                insertCase(formData);
            } else {
                updateCase(formData);
            }
    }, [formData]);

    const backButtonHandler = () => {
        navigate(`/stage1`);
    };

    return (
        <div className="app-main-container">
            <div className="back-button-container"><Tooltip title="Back"><Button shape="round" onClick={backButtonHandler} icon={<RollbackOutlined />} size={size} /></Tooltip></div>
            <div className="app-header-container"><h4>{params.action === 'add' ? 'ADD Case' : 'EDIT Case'}</h4></div>
            <div className="app-form-container">
                <Form ref={formRef}>
                    <Collapse defaultActiveKey={['1']} accordion>
                        <Panel header="Personal Info" key="1">
                            <Form.Item
                                key={1} // Add a unique key for each Form.Item component
                                label="Name"
                                name={`name`} // Use a unique name for each Form.Item component
                                initialValue={formData.name}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the name',
                                    },
                                ]}

                            ><Input />
                            </Form.Item>
                            <Form.Item
                                key={2} // Add a unique key for each Form.Item component
                                label="UID"
                                name={`uid`} // Use a unique name for each Form.Item component
                                rules={[
                                    { required: true, message: 'Please enter uid' },
                                ]}
                                initialValue={formData.uid}
                            ><Input />
                            </Form.Item>
                            <Form.Item
                                key={3} // Add a unique key for each Form.Item component
                                label="Id Type"
                                name={`idType`} // Use a unique name for each Form.Item componenty
                                rules={[
                                    { required: true, message: 'Please select id type' },
                                ]}
                                initialValue={formData.idType}
                            ><Select
                                    defaultValue="SG"
                                    onChange={handleChange}
                                    options={idOptions}
                                />
                            </Form.Item>
                            <Form.Item
                                key={4} // Add a unique key for each Form.Item component
                                label="UEN Number"
                                name={`uenNumber`} // Use a unique name for each Form.Item component
                                rules={[
                                    { required: true, message: 'Please enter uen number' },
                                ]}
                                initialValue={formData.uenNumber}
                            ><Input />
                            </Form.Item>
                            <Form.Item
                                key={5} // Add a unique key for each Form.Item component
                                label="Location"
                                name={`location`} // Use a unique name for each Form.Item componenty
                                initialValue={formData.location}
                                rules={[
                                    { required: true, message: 'Please select the location' },
                                ]}
                            ><Select
                                    defaultValue=""
                                    onChange={handleChange}
                                    options={countryOptions}
                                />
                            </Form.Item>
                            <Form.Item
                                key={6} // Add a unique key for each Form.Item component
                                label="Address"
                                name={`address`} // Use a unique name for each Form.Item component
                                initialValue={formData.address}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the address',
                                    },
                                ]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                            <Form.Item
                                key={7}
                                label="Gender"
                                name="gender"
                                initialValue={formData.gender}
                                rules={[{ required: true, message: 'Select gender' }]}
                            >
                                <Checkbox.Group options={genderOptions} onChange={onChange} />
                            </Form.Item>
                            <Form.Item
                                key={8} // Add a unique key for each Form.Item component
                                label="Date of Birth"
                                name={`dob`} // Use a unique name for each Form.Item component
                                initialValue={formData.dob != null ? moment(formData.dob) : null}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select the date of birth',
                                    },
                                ]}
                            >
                                <DatePicker onChange={dateOnChange} />
                            </Form.Item>
                            <Form.Item
                                key={9} // Add a unique key for each Form.Item component
                                label="Role"
                                name={`role`} // Use a unique name for each Form.Item componenty
                                rules={[
                                    { required: true, message: 'Please select the role' },
                                ]}
                                initialValue={formData.role}
                            ><Select
                                    defaultValue=""
                                    onChange={handleChange}
                                    options={roleOptions}
                                />
                            </Form.Item>
                        </Panel>
                        <Panel header="Case Info" key="2">
                            <Form.Item
                                key={10} // Add a unique key for each Form.Item component
                                label="Case Type"
                                name={`caseType`} // Use a unique name for each Form.Item componenty
                                rules={[
                                    { required: true, message: 'Please select case type' },
                                ]}
                                initialValue={formData.caseType}
                            ><Select
                                    defaultValue=""
                                    onChange={handleChange}
                                    options={caseTypeOptions}
                                />
                            </Form.Item>
                            <Form.Item
                                key={11} // Add a unique key for each Form.Item component
                                label="Case Description"
                                name={`description`} // Use a unique name for each Form.Item component
                                initialValue={formData.description}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the description',
                                    },
                                ]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                            <Form.Item
                                key={12} // Add a unique key for each Form.Item component
                                label="Operator Name"
                                name={`operatorName`} // Use a unique name for each Form.Item componenty
                                rules={[
                                    { required: true, message: 'Please select the role' },
                                ]}
                                initialValue={formData.operatorName}
                            ><Select
                                    defaultValue=""
                                    onChange={handleChange}
                                    options={operatorNameOptions}
                                />
                            </Form.Item>
                            <Form.Item
                                key={13} // Add a unique key for each Form.Item component
                                label="Case Classification"
                                name={`caseClassification`} // Use a unique name for each Form.Item componenty
                                rules={[
                                    { required: true, message: 'Please select case the case classification' },
                                ]}
                                initialValue={formData.caseClassification}
                            ><Select
                                    defaultValue=""
                                    onChange={handleChange}
                                    options={caseClassificationOptions}
                                />
                            </Form.Item>
                            <Form.Item
                                key={14} // Add a unique key for each Form.Item component
                                label="Date of Incidence"
                                name={`doi`} // Use a unique name for each Form.Item component
                                initialValue={formData.doi != null ? moment(formData.doi) : null}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select the date of incidence',
                                    },
                                ]}
                            >
                                <DatePicker onChange={dateOnChange} />
                            </Form.Item>
                        </Panel>
                    </Collapse>
                </Form>
            </div>
            <div className="app-button-container">
                <Button onClick={handleSaveDraft}>
                    Save as Draft
                </Button>
                <Button type="primary" onClick={handleFormSubmit}>
                    Submit
                </Button>
            </div>
        </div>


    );
}



export default Stage1App;