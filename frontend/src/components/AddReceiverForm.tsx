import { FC, useState } from 'react';
import { Button, Form, Input, notification } from 'antd'
import { ethers } from 'ethers';

interface AddReceiverProps {
  onSubmit: ((address: string, nickname: string) => Promise<void>);
}

const AddReceiverForm: FC<AddReceiverProps> = ({ onSubmit }) => {
  const [addReceiverLoading, setAddReceiverLoading] = useState(false);

  const addReceiver = async (values: any) => {
    setAddReceiverLoading(true);
    const nickname = values.nickname == null ? "" : values.nickname;
    try {
      await onSubmit(ethers.utils.getAddress(values.address), nickname);
    } catch (e: any) {
      notification.open({
        message: "Transaction Failed.",
        description: e.message,
      });
    } finally {
      setAddReceiverLoading(false);
    }
  }

  return (
    <div>
      <Form layout="vertical" onFinish={addReceiver} style={{ width: '400px' }}>
        <Form.Item
          label="Nickname"
          name="nickname"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Wallet Address"
          name="address"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
            {
              validator: (rule: any, value: string, cb: (msg?: string) => void) => {
                ethers.utils.isAddress(value) ? cb() : cb("");
              },
              message: 'This is not a valid address'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            shape="round"
            size="middle"
            loading={addReceiverLoading}
            style={{
              background: 'linear-gradient(105.69deg, #FFFFFF 1.97%, rgba(255, 255, 255, 0) 104.4%)',
              color: 'black',
              fontSize: '18px',
              lineHeight: '21px',
              borderColor: 'rgba(15, 15, 15, 0.5)',
              boxShadow: "-2px 2px 12px rgba(0, 0, 0, 0.15), inset -2px 2px 12px rgba(0, 0, 0, 0.15)",
            }}
            htmlType="submit"
          >
            Add Receiver
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddReceiverForm;