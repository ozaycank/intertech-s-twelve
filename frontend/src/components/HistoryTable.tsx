import { FC, useState } from 'react';
import { Col, Row, Input, Space, Table, Empty } from 'antd'
import { CloseOutlined } from '@ant-design/icons';
import { ethers } from 'ethers';
import type {ColumnsType} from 'antd/es/table';
import CSS from "csstype";


interface DataType {
    key: string;
    sender: string;
    receiver: string;
    date: string;
    amount: string;
  }


interface HistoryTableProps {
    data: Array<DataType>;
}

const HistoryTable: FC<HistoryTableProps> = ({ data }) => {

    const columns: ColumnsType<DataType> = [
        {
          title: 'SENDER',
          dataIndex: 'sender',
          key: 'sender',
          render: text => <a href={`https://rinkeby.etherscan.io/address/${text}`} target="blank">{text}</a>,
        },
        {
          title: 'RECEIVER',
          dataIndex: 'receiver',
          key: 'receiver',
          render: text => <a href={`https://rinkeby.etherscan.io/address/${text}`} target="blank">{text}</a>,
        },
        {
          title: 'DATE',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'AMOUNT',
          dataIndex: 'amount',
          key: 'amount',
          
        }
      ];
   

    return (
        <div>
            <Table className= "table-striped-rows" locale={{emptyText:  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='You do not have  a transaction history yet.' /> }}  columns={columns} dataSource={data} pagination={{ pageSize: 25 }} />
        </div>
    );
}

export default HistoryTable;