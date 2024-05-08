import { Guaranty } from "@/type";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Space, Table } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as guarantyServices from '@/api/guarantyServices'
function GuaranriesList() {
    const [data, setData] = React.useState<Guaranty[]>();
    useEffect(()=>{
        //load api voo dday 
    },[])
    return <div>
        <Space direction="vertical" style={{width:"100%"}}>
                <Flex justify="space-between">
                    <Link to={'/admin/category-add'}>
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Add
                        </Button>
                    </Link>
                    {/* <SearchC typeSearch={2} onSetState={setData} /> */}
                </Flex>
                {/* thêm table vô đây */}
            </Space>
        
    </div>;
}

export default GuaranriesList;