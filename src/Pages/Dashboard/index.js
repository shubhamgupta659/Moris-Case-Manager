import { Table, Tag } from "antd";
import { useState, useEffect } from "react";
import NavCards from "../NavCards";
import { DownloadOutlined } from '@ant-design/icons';

function Dashboard() {
    const [savedDraftDataSource, setSavedDraftDataSource] = useState([]);
    const [submittedApplicationDataSource, setSubmittedApplicationDataSource] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchSavedDraftRecords(1);
    }, []);
    useEffect(() => {
        fetchSubmittedApplicationRecords(1);
    }, []);

    const data = [{
        title: "New Application - Questionare",
        formLink: "https://www.google.com",
        submissionDateAndTime: "10 June 2021 10:00AM",
        submittedBy: "Unison Consulting",
        download: "data",
        lastCorrespondence: "",
        status: ["pending"]
    }];

    const savedDraftColumns = [
        {
            title: "Title of transaction",
            dataIndex: "title",
        },
        {
            title: "Last Modified",
            dataIndex: "lastModified",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
    ];

    const submittedApplicationColumns = [
        {
            title: "Title of transaction",
            key: "title",
            dataIndex: "title",
            render: (_, { title,formLink }) => (
                <>
                    <a href={formLink}>{title}</a>
                </>
            ),
        },
        {
            title: "Submission Date & Time",
            key: "submissionDateAndTime",
            dataIndex: "submissionDateAndTime",
        },
        {
            title: "Submitted By",
            key: "submittedBy",
            dataIndex: "submittedBy",
        },
        {
            title: "Download",
            key: "download",
            dataIndex: "download",
            render: (_, { download }) => (
                <>
                    <DownloadOutlined />
                </>
            ),
        },
        {
            title: "Last Correspondence",
            key: "lastCorrespondence",
            dataIndex: "lastCorrespondence",
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (_, { status }) => (
                <>
                    {status.map((s) => {
                        let color = s === 'pending' ? 'orange' : s === 'completed' ? 'green' : 'red';
                        return (
                            <Tag color={color} key={s}>
                                {s.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
    ];

    const fetchSavedDraftRecords = (page) => {
        setLoading(true);
        setSavedDraftDataSource([]);
        setTotalPages(0);
        setLoading(false);

    };

    const fetchSubmittedApplicationRecords = (page) => {
        setLoading(true);
        setSubmittedApplicationDataSource(data);
        setTotalPages(0);
        setLoading(false);
    };

    return (
        <div className="dash-main-container">
            <NavCards active={''} />
            <div className="saved-draft">
                <h4>Saved Drafts</h4>
                <Table
                    loading={loading}
                    columns={savedDraftColumns}
                    dataSource={savedDraftDataSource}
                    pagination={{
                        pageSize: 10,
                        total: totalPages,
                        onChange: (page) => {
                            fetchSavedDraftRecords(page);
                        },
                    }}
                ></Table>
            </div>

            <div className="submitted-application">
                <h4>Submitted Application</h4>
                <Table
                    loading={loading}
                    columns={submittedApplicationColumns}
                    dataSource={submittedApplicationDataSource}
                    pagination={{
                        pageSize: 10,
                        total: totalPages,
                        onChange: (page) => {
                            fetchSubmittedApplicationRecords(page);
                        },
                    }}
                ></Table>
            </div>
        </div>

    );
}


export default Dashboard;