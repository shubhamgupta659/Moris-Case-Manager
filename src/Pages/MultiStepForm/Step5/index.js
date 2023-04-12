import React, { useEffect } from "react";
import { Form, Input } from 'antd';
const FormStep5 = ({ formData, setFormData, formRef }) => {
    const { step5Data } = formData;
    const [form] = Form.useForm();

    useEffect(() => {
        // Load data from local storage on component mount
        const storedData = JSON.parse(localStorage.getItem('formStep2Data'));
        if (storedData) {
            formRef.current.setFieldsValue(storedData);
        }
    }, [formRef]); // Add formRef to the dependency array

    return (
        <><Form ref={formRef} form={form} layout="vertical">
            <Form.Item
                key={1} // Add a unique key for each Form.Item component
                label="Field1"
                name={`field1`} // Use a unique name for each Form.Item component
                initialValue={step5Data.field1}
                rules={[
                    {
                        required: true,
                        message: 'Please enter field 1',
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </Form></>
    );
};

export default FormStep5;
