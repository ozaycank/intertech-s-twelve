import { FC, useState } from 'react';
import { Button, List, Avatar, notification } from 'antd'
import { CloseOutlined } from '@ant-design/icons';
import { ethers } from 'ethers';

interface ReceiversProps {
    receivers: Array<any>;
    onRemove: ((address: string) => Promise<void>);
}

const ReceiverList: FC<ReceiversProps> = ({ receivers, onRemove }) => {
    const [removeReceiverDisabled, setRemoveReceiverDisabled] = useState(false);

    const removeReceiver = async (address: string) => {
        setRemoveReceiverDisabled(true);
        try {
          await onRemove(ethers.utils.getAddress(address));
        } catch (e: any) {
          notification.open({
            message: "Transaction Failed.",
            description: e.message,
          });
        } finally {
            setRemoveReceiverDisabled(false);
        }
    }

    return (
        <div>
            <List style={{ width: '460px' }}
                itemLayout="horizontal"
                dataSource={receivers}
                renderItem={(item) => (
                    <List.Item
                        style={{ textAlign: 'left' }}
                        extra={
                            <Button
                                type='primary'
                                shape='circle'
                                size='small'
                                danger={true}
                                icon={<CloseOutlined />}
                                onClick={() => removeReceiver(item['addr'])}
                                disabled={removeReceiverDisabled}
                            />
                        }
                    >
                        <List.Item.Meta
                            // TODO: Change avatar with ENS Avatars if available
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={item['nickname']}
                            description={item['addr']}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}

export default ReceiverList;