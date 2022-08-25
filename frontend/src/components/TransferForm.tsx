import { FC, useState } from 'react';
import { Button, Form, Input, InputNumber, notification, Select } from 'antd'
import { ethers } from 'ethers';

interface ContractProps {
  receivers: Array<any>;
  onTransfer: ((addr: string, amount: ethers.BigNumber) => Promise<void>);
}

const TransferForm: FC<ContractProps> = ({ receivers, onTransfer }) => {
  const [transferLoading, setTranferLoading] = useState(false);

  const transfer = async (values: any) => {
    setTranferLoading(true);
    const addr = values.receiverAddr === 'other' ? values.otherAddr : values.receiverAddr;
    try {
      await onTransfer(addr, ethers.utils.parseEther(values.amount));
    } catch (e: any) {
      notification.open({
        message: "Transaction Failed.",
        description: e.message,
      });
    } finally {
      setTranferLoading(false);
    }
  }

  const receiverOptions = receivers.map((receiver) =>
    <Select.Option value={receiver.addr} key={receiver.addr}>
      <h4>{receiver.nickname}</h4>
      {receiver.addr}
    </Select.Option>
  );

  return (
    <div>
      <Form layout="vertical" onFinish={transfer} initialValues={{ 'amount': "0.1" }} style={{ width: '420px' }}>
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
              width: '420px',
            }}
            min="0"
            step="0.00000000000001"
            addonAfter="ETH"
            stringMode
          />
        </Form.Item>
        <Form.Item
          name="receiverAddr"
          label="Receiver"
          rules={[
            {
              required: true,
              message: 'This field is required!',
            },
          ]}
        >
          <Select placeholder="Select a receiver" allowClear>
            {receiverOptions}
            <Select.Option value="other">
              <h4>Other</h4>
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.receiverAddr !== currentValues.receiverAddr}
        >
          {({ getFieldValue }) =>
            getFieldValue('receiverAddr') === 'other' ? (
              <Form.Item
                name="otherAddr"
                label="Receiver Address"
                rules={[
                  {
                    required: true,
                    message: 'This field is required!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item>
          <Button
            shape="round"
            size="middle"
            loading={transferLoading}
            htmlType="submit"
            style={{
              background: 'linear-gradient(105.69deg, #CAB7EE 1.97%, #FFB49C 104.4%)',
              color: 'black',
              fontSize: '18px',
              lineHeight: '21px'
            }}
          >
            Transfer
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default TransferForm;