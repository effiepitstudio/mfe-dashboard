import React from "react";
import { Provider } from "react-redux";
import { createFormStore } from "./store";
import { EntryForm } from "./components/EntryForm";

const store = createFormStore();

const App: React.FC = () => {
    <Provider store={store}>
        <article aria-label="Data Entry form">
            <EntryForm />
        </article>
    </Provider>
};

export default App;
