import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ConfigProvider, message as antdMessage } from 'antd';
import AppRoutes from "./pages/Routes"

function App() {
  // const [messageApi, contextHolder] = antdMessage.useMessage();

  return (
    <>
      <ConfigProvider theme={{ token: { colorPrimary: '#1d3557' } }}>
        {/* {contextHolder} */}
        <AppRoutes />
      </ConfigProvider>
    </>
  );
}

export default App;
