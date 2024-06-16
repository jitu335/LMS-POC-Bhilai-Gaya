import './App.css';
import './_variables.scss';
import './assets/scss/_global.scss'
import AppRoutes from "./Router";
import { ProSidebarProvider } from 'react-pro-sidebar';

function App() {
  return (
    <ProSidebarProvider>
    <AppRoutes />
    </ProSidebarProvider>
  );
}

export default App;
