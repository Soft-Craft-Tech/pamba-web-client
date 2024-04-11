"use client";
import TextField from '@mui/material/TextField';
import ProfileProgress from '../../core/cards/progress';
import { CompleteProfileContext } from "@/app/context/completeProfile/completeProfileContext";
import { useContext, useState} from "react";
import { AiOutlineClose } from "react-icons/ai";
import uniqid from "uniqid";
import { usePostRequest } from '@/app/hooks/useRequests';
import Toast from '../../shared/toasts/genToast';

export default function AddExpenseAccounts() {
    const {setStep} = useContext(CompleteProfileContext);
    const [addedAccount, setAddedAccount] = useState({accountName: "", description: ""});
    const [queuedExpenses, setQueuedExpenses] = useState([]);

    // Next slide
    const handleNext = () => {
        setStep(prev => prev+1);
    }

    //  Post Queued Service
    const {postFn, requestError, requestPending} = usePostRequest(
        "http://127.0.0.1:5000/API/accounts/create-account",
        {accounts:  queuedExpenses},
        true,
        handleNext
    );

    // Form Input Change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddedAccount(prev => {return {...prev, [name]: value}});
    }

    // Submit Expense
    const submitExpense = (e) => {
        e.preventDefault();
        setQueuedExpenses(prev => {return [...prev, addedAccount]});
        setAddedAccount({accountName: "", description: ""});
    }

    // Dequeue an expense account
    const dequeueExpense = (accountIndex) => {
        return setQueuedExpenses(prev => {
            return prev.filter((_, index) => index !== accountIndex);
        })
    }

    const saveServices = () => {
        if(queuedExpenses.length !== 0) {
            postFn();
        }
    }

    return (
        <div className="w-full h-auto flex flex-col gap-5 px-20 py-10">
            {requestError && <Toast message={[401, 400, 403, 404, 409].includes(requestError?.response?.status) ? requestError?.response?.data?.message : "Something went wrong"} type="error" />}
            <ProfileProgress />
            <div className="w-full flex gap-10">
                <div className="flex flex-col gap-5 min-w-96 max-h-96 p-10 border bg-white">
                    <h3>Create your Business&apos;s Expense Accounts</h3>
                    <form onSubmit={submitExpense} className="flex flex-col gap-3">
                        <TextField
                            required
                            id="outlined-required"
                            label="Expense Account"
                            type="text"
                            name="accountName"
                            value={addedAccount.accountName}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Description"
                            type="text"
                            name="description"
                            value={addedAccount.description}
                            onChange={handleChange}
                        />
                        <button className="py-2 px-10 bg-secondary text-white h-max rounded-md">Add</button>
                    </form>
                </div>
                {queuedExpenses.length > 0 && <div className="w-full h-full p-7 bg-white flex gap-3 flex-wrap">
                    {
                        queuedExpenses.map((item, index) => {
                            {return <div key={uniqid()} className="flex gap-3 items-center w-max h-auto rounded-md bg-secondary px-4 py-2 text-white">
                                {item.accountName}
                                <AiOutlineClose size={20} className="cursor-pointer hover:text-primary" onClick={() => {dequeueExpense(index)}} />
                            </div>
                        }})
                    }
                    
                </div>}
            </div>
            <div className="w-full h-10 flex justify-end">
                <button disabled={requestPending || queuedExpenses.length === 0} type="button" onClick={saveServices} className="w-max px-7 py-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed">{requestPending ? <>Loading</> : <>Finish</>}</button>
            </div>
        </div>
    )
}