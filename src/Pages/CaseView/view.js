import React, { useState, useRef, useEffect, useContext } from 'react';
import AppStatusPane from "../AppStatusPane";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Col, Row } from 'antd';
import axios from 'axios';
import { Select, Modal, Form, Input, Upload, Button, Tooltip } from 'antd';
import { UploadOutlined, RollbackOutlined } from '@ant-design/icons';
import moment from 'moment';
import { AuthContext } from '../../AuthContext';
const { TextArea } = Input;


function ViewAppAction() {
    const { accessToken } = useContext(AuthContext);
    const [size] = useState('small');
    const navigate = useNavigate();
    const { state } = useLocation();
    const params = useParams();
    const [postResult, setPostResult] = useState(null);
    async function fetchCommentsData() {
        let msg = JSON.stringify({
            "dataSource": "Singapore-free-cluster",
            "database": "appWorkflow",
            "collection": "comments",
            "filter": { "caseId": params.id },
            "sort": { "commentId": -1 },
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gqwih/endpoint/data/v1/action/find',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
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
        fetchCommentsData();
    }, []);

    const backButtonHandler = () => {
        navigate(`/${params.stage}`);
    };
    return (
        <div className='view-main-container'>
            <div className='view-status-pane'><AppStatusPane parentData={postResult} /></div>
            <div>
                <Row>
                    <Col span={12}>
                        <div className='view-form-container'>
                            <div className='view-form-header'>
                                <h2>View Case</h2>
                            </div>
                            <div className='view-form-sep'><hr></hr></div>

                            <div className='view-form-content'>
                                <table className="striped">
                                    <tbody>
                                        <tr>
                                            <td className='case-label'>Case Id</td>
                                            <td>{state.caseId}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>FI Name</td>
                                            <td>{state.fiName}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>UID</td>
                                            <td>{state.uid}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>ID Type</td>
                                            <td>{state.idType}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>UEN No.</td>
                                            <td>{state.uenNumber}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Location</td>
                                            <td>{state.location}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Address</td>
                                            <td>{state.address}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Gender</td>
                                            <td>{state.gender}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Date of Birth</td>
                                            <td>{state.dob}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Case Type</td>
                                            <td>{state.caseType}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Case Description</td>
                                            <td>{state.description}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Case Classification</td>
                                            <td>{state.caseClassification}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Operator Name</td>
                                            <td>{state.operatorName}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Date of Incidence</td>
                                            <td>{state.doi}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Role</td>
                                            <td>{state.role}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Case Status</td>
                                            <td style={{
                                                backgroundColor:
                                                    state.caseStatus === 'Draft'
                                                        ? '#ff9800'
                                                        : state.caseStatus === 'Open'
                                                            ? '#42a5f5'
                                                            : state.caseStatus.includes('Temp CFF')
                                                                ? '#e65100'
                                                                : state.caseStatus.includes('Escalated')
                                                                    ? '#4caf50'
                                                                    : state.caseStatus.includes('Re-Assign')
                                                                        ? '#ef5350'
                                                                        : state.caseStatus.includes('Archive')
                                                                            ? '#ba68c8'
                                                                            : '#c62828',
                                                color: '#fff',
                                                display: 'table',
                                            }}>{state.caseStatus}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='view-form-container'>

                            <div className='view-form-header'>
                                <h2>Review Section</h2>
                                <div className="view-back-button-container"><Tooltip title="Back"><Button shape="round" onClick={backButtonHandler} icon={<RollbackOutlined />} size={size} /></Tooltip></div>
                            </div>
                            <div className='view-form-sep'><hr></hr></div>
                            <ActionCont stage={params.stage} casedata={state} accessToken={accessToken} noofcomments={postResult === null ? 0 : postResult.length} />

                            <div className='view-form-comments-container'>
                                <table className="striped">
                                    <thead>
                                        <tr>
                                            <th className='comment-column-style'>Assigned By</th>
                                            <th className='comment-column-style'>Date</th>
                                            <th className='comment-column-style'>Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody className='comment-body-style'>
                                        {postResult === null ? [].map((c, index) => (
                                            <tr>
                                                <td>{c.assignedBy}</td>
                                                <td>{c.commentDate}</td>
                                                <td>{c.commentMsg}</td>
                                            </tr>
                                        )) : postResult.map((c, index) => (
                                            <tr>
                                                <td>{c.assignedBy}</td>
                                                <td>{c.commentDate}</td>
                                                <td>{c.commentMsg}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

const ActionCont = (props) => {
    if ((props.stage === 'stage2' && (props.casedata.caseStatus === 'Open' || props.casedata.caseStatus === 'Re-Assign' || props.casedata.caseStatus === 'Temp CFF'))
        || (props.stage === 'stage3' && (props.casedata.caseStatus === 'Escalated' || props.casedata.caseStatus === 'CFF' || props.casedata.caseStatus === 'Archive'))) {
        return (
            <div className='view-select-action-container'>
                <Form>
                    <Form.Item
                        key={1} // Add a unique key for each Form.Item component
                        label="Action"
                        name={`action`} // Use a unique name for each Form.Item component
                        rules={[
                            {
                                required: true,
                                message: 'Please select the action',
                            },
                        ]}
                    >
                        <SelectDrop stage={props.stage} casedata={props.casedata} noofcomments={props.noofcomments} />
                    </Form.Item>
                </Form>
            </div>
        );
    }
};

const SelectDrop = (props) => {
    const navigate = useNavigate();
    const formItems = [];
    const [open, setOpen] = useState(false);
    const [selectedDropValue, setSelectedDropValue] = useState();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const formRef = useRef();
    const [formData, setFormData] = useState({
        caseId: null,
        commentId: null,
        caseStatus: null,
        caseClassification: null,
        commentMsg: null,
        assignedTo: null,
        assignedBy: null,
        commentDate: null,
        attachment: null
    });

    async function insertComments(data) {
        let msg = JSON.stringify({
            "dataSource": "Singapore-free-cluster",
            "database": "appWorkflow",
            "collection": "comments",
            "document": data
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gqwih/endpoint/data/v1/action/insertOne',
            headers: {
                'Authorization': 'Bearer ' + props.accessToken,
                'Content-Type': 'application/json',
            },
            data: msg
        };

        await axios.request(config)
            .then((response) => {
                updateCase(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    async function updateCase(data) {
        let msg = JSON.stringify({
            "dataSource": "Singapore-free-cluster",
            "database": "appWorkflow",
            "collection": "applications",
            "filter": { "_id": { "$oid": props.casedata._id } },
            "update": {
                "$set": {
                    "caseStatusId": data.caseStatus === 'Open' ? 2 : data.caseStatus === 'Escalated' ? 3 : data.caseStatus === 'Re-Assign' ? 4 : data.caseStatus === 'Temp CFF' ? 5 : data.caseStatus === 'CFF' ? 6 : data.caseStatus === 'Archive' ? 7 : 1,
                    "caseClassification": data.caseClassification,
                    "caseStatus": data.caseStatus,
                    "comment": data.commentMsg,
                    "assignee": data.assignedBy,
                }
            }
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gqwih/endpoint/data/v1/action/updateOne',
            headers: {
                'Authorization': 'Bearer ' + props.accessToken,
                'Content-Type': 'application/json',
            },
            data: msg
        };

        await axios.request(config)
            .then((response) => {
                navigate(`/${props.stage}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (formData.commentMsg != null) {
            insertComments(formData);
        }
    }, [formData]);

    const s1ActionOptions = [
        { value: 'Open', label: 'Open' },
        { value: 'Draft', label: 'Draft' },
    ];

    const s2ActionOptions = [
        { value: 'Open', label: 'Open' },
        { value: 'Re-Assign', label: 'Re-Assign' },
        { value: 'Escalated', label: 'Escalate' },
        { value: 'Temp CFF', label: 'Temp CFF' },
    ];

    const s3ActionOptions = [
        { value: 'Open', label: 'Open' },
        { value: 'CFF', label: 'CFF' },
        { value: 'Archive', label: 'Archive' },
    ];

    const caseClassificationOptions = [
        { value: 'Sensitive', label: 'Sensitive' },
        { value: 'Non-Sensitive', label: 'Non-Sensitive' },
    ];

    const handleSubmit = () => {
        formRef.current.validateFields().then((values) => {
            setFormData({
                "caseId": props.casedata.caseId,
                "commentId": props.noofcomments + 1,
                "caseStatus": values.caseStatus,
                "caseClassification": values.caseClassification,
                "commentMsg": values.commentMsg,
                "attachment": values.attachment,
                "assignedBy": props.stage === 'stage1' ? 'ASO' : props.stage === 'stage2' ? 'CIO' : 'AO',
                "assignedTo": "Stage 1",
                "commentDate": moment(),
            });
        });
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 5000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleChange = (value) => {
        setSelectedDropValue(value);
        setOpen(true);
    };

    if (props.stage === 'stage1') {
        formItems.push(<Select
            defaultValue=""
            onChange={handleChange}
            options={s1ActionOptions}
        />);
    } else if (props.stage === 'stage2') {
        formItems.push(<Select
            defaultValue=""
            onChange={handleChange}
            options={s2ActionOptions}
        />);
    } else if (props.stage === 'stage3') {
        formItems.push(<Select
            defaultValue=""
            onChange={handleChange}
            options={s3ActionOptions}
        />);
    }
    formItems.push(
        <Modal
            title="Enter Comment"
            open={open}
            onOk={handleSubmit}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Form ref={formRef}>
                <Form.Item
                    key={1} // Add a unique key for each Form.Item component
                    label="Case Status"
                    name={`caseStatus`} // Use a unique name for each Form.Item component
                    initialValue={selectedDropValue}
                    rules={[
                        {
                            required: true,
                            message: 'Please select the action',
                        },
                    ]}

                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    key={2} // Add a unique key for each Form.Item component
                    label="Case Classification"
                    name={`caseClassification`} // Use a unique name for each Form.Item componenty
                    rules={[
                        { required: true, message: 'Please select case the case classification' },
                    ]}
                    initialValue={props.casedata.caseClassification}
                ><Select
                        defaultValue=""
                        onChange={handleChange}
                        options={caseClassificationOptions}
                    />
                </Form.Item>
                <Form.Item
                    key={3} // Add a unique key for each Form.Item component
                    label="Comment"
                    name={`commentMsg`} // Use a unique name for each Form.Item component
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
                    key={4}
                    label="Attachment"
                    name="attachment"
                >
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>);
    return formItems;
};

export default ViewAppAction;