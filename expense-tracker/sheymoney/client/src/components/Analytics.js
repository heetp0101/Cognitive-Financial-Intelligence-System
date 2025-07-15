import { Progress } from 'antd';
import React from 'react';
import '../resources/analytics.css';
function Analytics({ transactions }) {


  const totalTransactions = transactions.length;
  console.log(transactions);
  const totalIncomeTransactions = transactions.filter(transaction => transaction.type == 'Income');
  const totalExpenseTransactions = transactions.filter(transaction => transaction.type == 'Expense');
  const totalIncomeTransactionPercentage = (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpenseTransactionPercentage = (totalExpenseTransactions.length / totalTransactions) * 100;

  // const totalTurnover = transactions.reduce((acc,transaction)=> acc + transaction.amount, 0)
  // calculate sum of all amounts

  // CALCULATE SUM OF ALL AMOUNTS
  const totalTurnover = transactions.reduce((sum, transaction) => {
    return sum + parseInt(transaction.amount);
  }, 0);


  //CALCULATE SUM OF ALL AMOUNTS ON EXPENSES
  const totalExpenseTurnover = transactions
    .filter(transaction => transaction.type === "Expense")
    .reduce((sum, transaction) => sum + parseInt(transaction.amount), 0);


  //CALCULATE SUM OF ALL AMOUNTS ON INCOME
  const totalIncomeTurnover = transactions
    .filter(transaction => transaction.type === "Income")
    .reduce((sum, transaction) => sum + parseInt(transaction.amount), 0);


  //    console.log(totalTurnover);
  // const totalIncomeTurnover =  transactions.filter((acc,transaction) => transaction.type==='income' && acc + transaction.amount, 0 )
  // const totalExpenseTurnover =  transactions.filter((acc,transaction) => transaction.type==='expense' && acc + transaction.amount, 0 )
  const totalIncomeTurnoverPercentage = (totalIncomeTurnover / totalTurnover) * 100
  const totalExpenseTurnoverPercentage = (totalExpenseTurnover / totalTurnover) * 100

  const categories = ['Salary', 'Entertainmnet', 'FreeLance', 'Food', 'Education', 'Medical', 'Tax'];
  return (
    <div className='analytics'>
      <div className='row'>
        <div className='col-md-4 mt-3'>
          <div className='transactions-count'>
            <h4>Total Transactions : {totalTransactions}</h4>
            <hr />
            <h4> Income: {totalIncomeTransactions.length}</h4>
            <h4> Expense: {totalExpenseTransactions.length}</h4>

            <div className='progress-bars'>
              <Progress className='mx-5' strokeColor='green' type='circle' percent={totalIncomeTransactionPercentage.toFixed(0)} />
              <Progress strokeColor='red' type='circle' percent={totalExpenseTransactionPercentage.toFixed(0)} />
              <div className='d-flex flex-column'>
              </div>

            </div>
          </div>
        </div>

        <div className='col-md-4 mt-3'>
          <div className='transactions-count'>
            <h4>Total TurnOver : {totalTurnover}</h4>
            <hr />
            <h4> Income: {totalIncomeTurnover}</h4>
            <h4> Expense: {totalExpenseTurnover}</h4>
            <div className='progress-bars'>
              <Progress className='mx-5' strokeColor='green' type='circle' percent={totalIncomeTurnoverPercentage.toFixed(0)} />
              <Progress strokeColor='red' type='circle' percent={totalExpenseTurnoverPercentage.toFixed(0)} />
              <div className='d-flex flex-column'>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-5'>
        <div className='col-md-6'>
          <div className='income-category-analysis'>
            <h4>Income-Category Wise</h4>
            {categories.map((category)=>{
              const amount = transactions.filter((t) => t.type === "Income" && t.category === category).reduce((acc,t) => acc+parseInt(t.amount), 0);
              return (
                amount > 0 && <div className='category-card'> 
                <h5>{category}</h5>
                <Progress percent={ ((amount / totalIncomeTurnover) *100).toFixed(2) }/>
                </div>
              )
            })}
          </div>
        </div>

        <div className='col-md-6'>
          <div className='expense-category-analysis'>
            <h4>Expense-Category Wise</h4>
            {categories.map((category)=>{
              const amount = transactions.filter((t) => t.type === "Expense" && t.category === category).reduce((acc,t) => acc+parseInt(t.amount), 0);
              return (
                amount > 0 && <div className='category-card'> 
                <h5>{category}</h5>
                <Progress percent={ ((amount / totalExpenseTurnover) *100).toFixed(2) }/>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Analytics;
