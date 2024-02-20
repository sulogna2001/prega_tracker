import React from 'react';
import { Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
const { Content, Footer } = Layout;

const DashboardLayout = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout style={{ height: '100vh' }}>

            <Content
                style={{ height: '100%', padding: '10px' }}
            >

                <Sider
                    width={200}
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                    />
                </Sider>
                {children}
            </Content>

        </Layout>
    );
};
export default DashboardLayout;