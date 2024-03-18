import logo from './logo.svg';
import './App.css';
import { TabComponent } from './TabComponent/tabs.tsx';

function App() {
  return (
    <div className="App" style={{'min-height': '100vh' , 'background-image': 'url("https://videosforfhl.blob.core.windows.net/otherdata/flashcastbackground.png?sp=r&st=2024-03-15T18:11:43Z&se=2026-10-30T02:11:43Z&spr=https&sv=2022-11-02&sr=b&sig=e6RzHGxtBN4pf9wgmH4piKLtncgGoWiZV4uQAARoDFk%3D")'}}>
      <TabComponent/>
    </div>
  );
}

export default App;
