import { FC, useState } from 'react';
import { Button, Form, InputNumber, notification } from 'antd'
import { ethers } from 'ethers';

interface ContractProps {
    onDeposit: ((amount: ethers.BigNumber) => Promise<void>);
    onWithdraw: ((amount: ethers.BigNumber) => Promise<void>);
}

const DepositWithdrawForm: FC<ContractProps> = ({ onDeposit, onWithdraw }) => {
    const [depositLoading, setDepositLoading] = useState(false);
    const [withdrawLoading, setWithdrawLoading] = useState(false);

    const [form] = Form.useForm();

    const deposit = async () => {
        try {
            await form.validateFields();
        } catch (e: any) {
            return;
        }
        const values = form.getFieldsValue();

        setDepositLoading(true);
        try {
            await onDeposit(ethers.utils.parseEther(values.amount));
        } catch (e: any) {
            notification.open({
                message: "Transaction Failed.",
                description: e.message,
            });
        } finally {
            setDepositLoading(false);
        }
    }

    const withdraw = async () => {
        try {
            await form.validateFields();
        } catch (e: any) {
            return;
        }
        const values = form.getFieldsValue();

        setWithdrawLoading(true);
        try {
            await onWithdraw(ethers.utils.parseEther(values.amount));
        } catch (e: any) {
            notification.open({
                message: "Transaction Failed.",
                description: e.message,
            });
        }
        setWithdrawLoading(false);
    }

    return (
        <div>
            <Form form={form} layout="vertical" initialValues={{ 'amount': "0.1" }}>
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <InputNumber
                        style={{
                            width: 220,
                        }}
                        min="0"
                        step="0.00000000000001"
                        addonAfter="ETH"
                        stringMode
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        shape="round"
                        size="middle"
                        loading={depositLoading}
                        onClick={deposit}
                        style={{ marginRight: "12px", background: '#CBB9EF', color: 'black', fontSize: '18px', lineHeight: '21px' }}
                    >
                        Deposit
                    </Button>
                    <Button
                        shape="round"
                        size="middle"
                        loading={withdrawLoading}
                        onClick={withdraw}
                        style={{ background: '#FFB8A1', color: 'black', fontSize: '18px', lineHeight: '21px' }}
                    >
                        Withdraw
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default DepositWithdrawForm;