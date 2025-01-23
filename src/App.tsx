import { CssBaseline, ThemeProvider } from '@mui/material';

import { TreeNodeWrapper } from './components/TreeNode/components/TreeNodeWrapper';
import { TreeContextProvider } from './components/TreeNode/context/TreeContextProvider';
import { useGetTree } from './services/tree/useGetTree';
import { useUpdateTree } from './services/tree/useUpdateTree';
import { useTheme } from './styles/useTheme';

function App() {
    const { theme } = useTheme();

    const { getTree } = useGetTree();
    const tree = getTree();
    const { updateTree } = useUpdateTree();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TreeContextProvider initialTree={tree} onUpdateTree={updateTree}>
                <TreeNodeWrapper />
            </TreeContextProvider>
        </ThemeProvider>
    );
}

export default App;
