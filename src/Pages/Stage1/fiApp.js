import { useLocation, useParams, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react';
import { Form, Checkbox, Input, Select, DatePicker, Button } from 'antd';
import axios from 'axios';
import moment from "moment";
const { TextArea } = Input;


const Stage1App = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const params = useParams();
    const formRef = useRef();
    const [formData, setFormData] = useState({
        caseId: state ? state.caseId : params.id,
        fiName: state ? state.fiName : null,
        uid: state ? state.uid : null,
        idType: state ? state.idType : null,
        uenNumber: state ? state.uenNumber : null,
        countryOfOrigin: state ? state.countryOfOrigin : null,
        address: state ? state.address : null,
        gender: state ? state.gender : null,
        dob: state ? state.dob : null,
        caseType: state ? state.caseType : null,
        role: state ? state.role : null,
        assignee: state ? state.assignee : null,
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
        { value: 'FI', label: 'FI' },
        { value: 'OIC', label: 'OIC' },
        { value: 'MGMT', label: 'MGMT' },
    ];

    const countryOptions = [
        { value: 'SG', label: 'SG' },
        { value: 'IN', label: 'IN' },
        { value: 'USA', label: 'USA' },
    ];

    const caseTypeOptions = [
        { value: 'Sample1', label: 'Sample1' },
        { value: 'Sample2', label: 'Sample2' },
        { value: 'Sample3', label: 'Sample3' },
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
                fiName: values.fiName,
                uid: values.uid,
                idType: values.idType,
                uenNumber: values.uenNumber,
                countryOfOrigin: values.countryOfOrigin,
                address: values.address,
                gender: values.gender,
                dob: values.dob,
                caseType: values.caseType,
                role: values.role,
                assignee: '',
                caseStatus: 'Draft',
                comment: ''
            });
        });
    };

    const handleFormSubmit = () => {
        formRef.current.validateFields().then((values) => {
            setFormData({
                caseId: params.id,
                fiName: values.fiName,
                uid: values.uid,
                idType: values.idType,
                uenNumber: values.uenNumber,
                countryOfOrigin: values.countryOfOrigin,
                address: values.address,
                gender: values.gender,
                dob: values.dob,
                caseType: values.caseType,
                role: values.role,
                assignee: '',
                caseStatus: 'Submitted',
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

    return (
        <div className="app-main-container">
            <div className="app-header-container"><h4>{params.action === 'add' ? 'ADD Case' : 'EDIT Case'}</h4></div>
            <div className="form-container">
                <Form ref={formRef}>
                    <Form.Item
                        key={1} // Add a unique key for each Form.Item component
                        label="FI Name"
                        name={`fiName`} // Use a unique name for each Form.Item component
                        initialValue={formData.fiName}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the fi name',
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
                        label="Country of Origin"
                        name={`countryOfOrigin`} // Use a unique name for each Form.Item componenty
                        rules={[
                            { required: true, message: 'Please select country of origin' },
                        ]}
                        initialValue={formData.countryOfOrigin}
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
                        key={10} // Add a unique key for each Form.Item component
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