import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/screens/home/Home'
import './index.css'

const config: ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false
}

const theme = extendTheme({ config })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<Home />
		</ChakraProvider>
	</React.StrictMode>
)
