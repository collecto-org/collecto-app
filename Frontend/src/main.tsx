import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './pages/App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/shared/layout/Layout.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';


function main(){

  const router = createBrowserRouter([
    {
      path:"*",
      element:(
        <Layout>
          <App/>
        </Layout>
      )
    }
  ])
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
      <RouterProvider router={router}/>
      </Provider>
    </StrictMode>,
  )
  
}

main()
