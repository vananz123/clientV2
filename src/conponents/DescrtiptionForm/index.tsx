import React, { createContext } from 'react';
import { Space } from 'antd';

const ReachableContext = createContext<string | null>(null);
const UnreachableContext = createContext<string | null>(null);


const App: React.FC = () => {

    return (
        <ReachableContext.Provider value="Light">
            <Space>

            </Space>
            <UnreachableContext.Provider value="Bamboo" />
        </ReachableContext.Provider>
    );
};

export default App;
