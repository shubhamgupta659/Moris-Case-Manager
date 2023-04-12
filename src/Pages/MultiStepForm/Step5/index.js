import React, { useEffect } from "react";

const FormStep5 = ({ formData, setFormData, formRef }) => {
    const { step5Data } = formData;

    useEffect(() => {
        // Load data from local storage on component mount
        const storedData = JSON.parse(localStorage.getItem('formStep2Data'));
        if (storedData) {
            formRef.current.setFieldsValue(storedData);
        }
    }, [formRef]); // Add formRef to the dependency array

    return (
        <></>
    );
};

export default FormStep5;
