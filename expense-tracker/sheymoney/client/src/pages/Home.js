import { AreaChartOutlined, DeleteOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { DatePicker, Form, Input, Modal, Select, Space, Table, message } from 'antd';
import { getAuth } from "firebase/auth";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Analytics from '../components/Analytics';
import DefaultLayout from "../components/DefaultLayout";
import FetchUserTransactions from "../firebase-database/FetchUserTransactions";
import Transactions from "../firebase-database/Transactions";
import customDateTransaction from '../firebase-database/customDateTransaction';
import deleteTransaction from '../firebase-database/deleteTransaction';
import filterTransactionType from '../firebase-database/filterTransactionType';
import filterUserTransaction from '../firebase-database/filterUserTransaction';
import updateTransaction from '../firebase-database/updateTransaction';
import '../resources/transactions.css';
import CheckableTag from 'antd/es/tag/CheckableTag';
import fetchAllTransactions from '../firebase-database/fetchAllTransactions';

function Home(props) {
    const [IsLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [Count, setCount] = useState();

    const [data, setdata] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [durationFilter, setDurationFilter] = useState(null);
    const [typeFilter, setTypeFilter] = useState(null);
    const { RangePicker } = DatePicker;
    const [viewType, setViewType] = useState('table');
    // const [editTransaction, setEditTransaction] = useState([]);
    const [type, setType] = useState('all');
   const [editdata, seteditdata] = useState([]);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    let recordToEdit = "";
    const [form] = Form.useForm();
    const handleDatePickerChange = async (dates, dateStrings) => {
        console.log('Selected dates:', dates);
        console.log('Formatted date strings:', dateStrings);

        const fetchCustomDateTransaction = await customDateTransaction(dateStrings);
        const filteredData = applyTypeFilter(fetchCustomDateTransaction.results);
        setdata(filteredData);

        setDurationFilter(dateStrings);
    };

    const auth = getAuth();
    const [showAddEditTransactionModel, setshowAddEditTransactionModel] = useState(false);

    const handleCancel = () => {
        setshowAddEditTransactionModel(false);
    }

    const handleMenuClick = async (selectedKey) => {
        const currentDate = moment();
        let startDate;

        switch (selectedKey) {
            case '1':
                startDate = currentDate.subtract(3, 'months');
                break;
            case '2':
                startDate = currentDate.subtract(6, 'months');
                break;
            case '3':
                startDate = currentDate.subtract(1, 'year');
                break;
            default:
                startDate = currentDate;
                break;
        }

        const filterDate = startDate.format("YYYY-MM-DD");
        const filterUserTransactions = await filterUserTransaction(filterDate);
        if(typeFilter == 'all')
        {
            setdata(filterUserTransactions.results);
        }
        else
        {
            const filteredData = applyTypeFilter(filterUserTransactions.results);
            setdata(filteredData);
        }


        setDurationFilter(filterDate);
    };

    ////////////////////////////// UPDATE  USER TRANSACTION  ///////////////////
    const handleEdit = (record) => {
        //Set the transaction to be edited in the state
        localStorage.setItem("oldTransactionData", JSON.stringify(record));

        recordToEdit = JSON.parse(localStorage.getItem("oldTransactionData"));
        seteditdata(record);
        setSelectedItemForEdit(recordToEdit);
        console.log(" transaction to be edited is : ", recordToEdit);
        // const updData = JSON.parse(localStorage.getItem("oldTransactionData"));
        setshowAddEditTransactionModel(true);
        
    }


    ///////////////////////////  DELETE  USER TRANSACTION   ///////////////////////
    const handleDelete = async(record) => {
        // console.log("Transaction that will be deleted: ", record);
       let fetchTransaction = []
        let oldStorageData = JSON.parse(localStorage.getItem("transactionsData"));
        console.log(oldStorageData);
        console.log("Type of oldStorageData before :", typeof oldStorageData);
       
        let transactionArray = Array.isArray(oldStorageData) ? oldStorageData : Object.values(oldStorageData);
    


        console.log("Type of transactionArray :", Array.isArray(transactionArray));

        const condition= {
            date: record.date,
            amount:record.amount,
            category:record.category,
            type:record.type,
            reference:record.reference
        };


                // 4️⃣ Save the updated list back to localStorage
        // localStorage.setItem("transactionsData", JSON.stringify(updatedRecords));

        // console.log("After deletion:", updatedRecords);
                // Find the index of the record in the array based on the conditions
        const recordIndexToDelete = transactionArray.findIndex(record => (
            record.date === condition.date &&
            record.amount === condition.amount &&
            record.category === condition.category &&
            record.type === condition.type &&
            record.reference === condition.reference
            // Add more conditions for other fields as needed
        ));
        // const deletedTransaction = await deleteTransaction(record);
        
        
        // setdata(deletedTransaction.results);

    //    Check if the record was found
        if (recordIndexToDelete !== -1) {
            // Delete the record from the array
            oldStorageData.splice(recordIndexToDelete, 1);
        
            // Save the updated array back to localStorage
            localStorage.setItem("transactionsData", JSON.stringify(oldStorageData));
            const checkData = JSON.parse(localStorage.getItem("transactionsData"));
            console.log(checkData);
            await deleteTransaction(record);


            console.log("Record deleted successfully.");
        } else {
            console.log("Record not found based on the specified conditions.");
        }

        
        const newUpdatedData = JSON.parse(localStorage.getItem("transactionsData"));
        setdata(newUpdatedData);

    }


    const handleTransactionType = async (type) => {
        if (type !== 'all') {
            // Fetch data based on the selected type
            let filterTransactionsType = await filterTransactionType(type);
            // Apply duration filter to the filtered data
            const filteredData = applyDurationFilter(filterTransactionsType.results);
            setdata(filteredData);
        } else {
            // Apply duration filter directly to the existing data
            const filterTransactionsType = await filterUserTransaction(durationFilter);
            // const filteredData = applyDurationFilter(filterTransactionsType.results);
            console.log(filterTransactionsType.results);
            setdata(filterTransactionsType.results);
        }
    
        // Update the type filter state
        setTypeFilter(type);
    }

    const applyDurationFilter = (transactions) => {
        if (durationFilter) {
            return transactions.filter(transaction => {
                const transactionDate = moment(transaction.date);
                return transactionDate.isAfter(durationFilter);
            });
        }
        return transactions;
    };

    const applyTypeFilter = (transactions) => {
        if (typeFilter) {
            return transactions.filter(transaction => transaction.type === typeFilter);
        }
        console.log("hello");
        return transactions;
    };

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Amount",
            dataIndex: "amount",
        },
        {
            title: "Category",
            dataIndex: "category",
        },
        {
            title: "Type",
            dataIndex: "type",
        },
        {
            title: "Reference",
            dataIndex: "reference",
        },
        {
            title:"Actions",
            dataIndex:"actions",
            render:(text, record)=>{
                return <div>
                    <EditOutlined onClick={() => handleEdit(record)} />
                    <DeleteOutlined onClick={() => handleDelete(record) } className='mx-3' />
                </div>
            }
        }
    ];

    useEffect(() => {

        const fetchUserData =  fetchTransactions();
        console.log(fetchUserData)
        // here we should display the data that has stored in cloud firestore
        const storedData = JSON.parse(localStorage.getItem("transactionsData")) || [];

        console.log(editdata);
        setdata(storedData);
        
    }, []);

// use effect to update form fields while renaming for different records
    useEffect(() => {
        if (selectedItemForEdit) {
            form.setFieldsValue(selectedItemForEdit); // ✅ Manually update form values
        }
    }, [selectedItemForEdit]);


    const fetchTransactions = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userEmail = user.email;
                console.log(userEmail)
                const transactionData = await FetchUserTransactions(userEmail);

                localStorage.setItem("transactionsData", JSON.stringify(transactionData.results));
                const filteredData = applyTypeFilter(transactionData.results);
                setdata(filteredData);
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const updateDataAndLocalStorage = async (newData) => {
        setdata(newData);
        localStorage.setItem("transactionsData", JSON.stringify(newData));
    };

    const onFinish = async (values) => {

        const updatedData = JSON.parse(localStorage.getItem("oldTransactionData"))
        console.log(" record to be edited : ",updatedData);
        console.log("Form Values : ",values);
        if(selectedItemForEdit)
        {
            // console.log(data);
            console.log("success");
            const updatedTransaction = await updateTransaction(updatedData, values);


            // update current localstorage data name "transactionData" after renaming record
            // here we would replace the transactionData with updatedTransaction

            localStorage.setItem("transactionsData", JSON.stringify(updatedTransaction));

            setdata(updatedTransaction.results);
            // console.log("new updated data : ", (await updatedTransaction).results);
            message.success("Transaction updated successfully !");
            setSelectedItemForEdit(null);
            
        }
        else
        {
            const addUserTransaction = await Transactions(values);

            const newDataArray = Array.isArray(addUserTransaction.dataArray)
                ? addUserTransaction.dataArray
                : [];
    
            const newData = [...(Array.isArray(data) ? data : []), ...newDataArray];
            const filteredData = applyTypeFilter(newData);
            setdata(filteredData);
    
            updateDataAndLocalStorage(newData);
        }

        localStorage.removeItem("oldTransactionData");
       //   Reset the editTransaction state
        // seteditdata(null);
//        Close the modal
        const currentData = JSON.parse(localStorage.getItem("transactionsData"));
        console.log("current data : ",currentData);

        setshowAddEditTransactionModel(false);
        
    };

    return (
        <DefaultLayout>
            <div className="filter d-flex justify-content-between align-items-center">
                <div>
                    <div className='d-flex flex-column'>
                        <h6>Select Frequency</h6>
                        <Space wrap>
                            <Select
                              
                                style={{ width: 120 }}
                                options={[
                                    { label: 'Last 3 month', value: '1' },
                                    { label: 'Last 6 month', value: '2' },
                                    { label: 'Last 1 year', value: '3' },
                                    { label: 'Custom', value: '4' }
                                ]}
                                onChange={(value) => {
                                    handleMenuClick(value);
                                    setShowDatePicker(value === '4');
                                }}
                            />
                        </Space>
                        {showDatePicker &&
                            (
                                <div className='mt-2'>
                                    <RangePicker onChange={handleDatePickerChange} />
                                </div>
                            )}
                    </div>


                </div>

                <div className='d-flex flex-column mx-5'>
                    <h6>Select Type</h6>
                    <Space wrap>
                        <Select
                            // defaultValue="All"
                            style={{ width: 120 }}
                            options={[
                                { label: 'Income', value: 'Income' },
                                { label: 'Expense', value: 'Expense' },
                                { label: 'All', value: 'all' },
                            ]}
                            onChange={(value) => {
                                handleTransactionType(value);
                            }}
                        />
                    </Space>
                </div>

                <div className='d-flex'>
                    <div>
                        <div className='view-switch mx-2'>
                            <UnorderedListOutlined className=
                                {`mx-3 ${viewType === "table" ? "active-icon" : "inactive-icon"
                                    }`}
                                onClick={() => setViewType('table')}
                                size={30} />
                            <AreaChartOutlined className=
                                {`${viewType === "analytics" ? "active-icon" : "inactive-icon"}`}
                                onClick={() => setViewType('analytics')}
                                size={30} />
                        </div>
                    </div>
                </div>

                <div>
                    <button className="primary" onClick={fetchTransactions}>Display</button>
                </div>

                <div>
                    <button className="primary" onClick={() => setshowAddEditTransactionModel(true)}>ADD NEW</button>
                </div>
            </div>

            <div className="table-analytics">
             {viewType==='table' ? <div className="table">
                    <Table columns={columns} dataSource={data} scroll={{ y: 400 }} pagination={{ pageSize: 16 }}></Table>
                </div> : <Analytics transactions={data} /> }
                <Modal title={selectedItemForEdit ? "Edit Transaction" : "Add Transaction"} open={showAddEditTransactionModel} onCancel={handleCancel} footer={false}>
                    <Form form={form} layout="vertical" className="transaction-form" onFinish={onFinish} initialValues={selectedItemForEdit}>
                        <Form.Item label="Amount" name="amount">
                            <Input type="text" />
                        </Form.Item>

                        <Form.Item label="Type" name="type">
                            <Select options={[{ label: 'Income', value: 'Income' }, { label: 'Expense', value: 'Expense' }]}></Select>
                        </Form.Item>

                        <Form.Item label="Category" name="category">
                            <Select options={[
                                { label: 'Salary', value: 'Salary' },
                                { label: 'FreeLance', value: 'FreeLance' },
                                { label: 'Food', value: 'Food' },
                                { label: 'Entertainmnet', value: 'Entertainmnet' },
                                { label: 'Education', value: 'Education' },
                                { label: 'Medical', value: 'Medical' },
                                { label: 'Tax', value: 'Tax' },
                            ]}>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Date" name="date">
                            <Input type="date" />
                        </Form.Item>

                        <Form.Item label="Reference" name="reference">
                            <Input type="text" />
                        </Form.Item>

                        <Form.Item label="Description" name="description">
                            <Input type="text" />
                        </Form.Item>

                        <div className="d-flex justify-content-end">
                            <button className="primary" onClick={handleCancel} type="submit">SAVE</button>
                        </div>
                    </Form>
                </Modal>
            </div>
        </DefaultLayout>
    );
}

export default Home;
